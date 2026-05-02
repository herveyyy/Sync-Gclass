import { auth } from "@/auth";
import { db } from "@/database";
import { classrooms } from "@/database/schema";
import { eq } from "drizzle-orm";
import { GetCourseListUseCase } from "../usecases/google-classroom/get_course_list.usecase";
import { GetCourseWorkUseCase } from "../usecases/google-classroom/get_coursework.usecase";
import { GetAnnouncementsUseCase } from "../usecases/google-classroom/get_announcements.usecase";
import { GetCourseUseCase } from "../usecases/google-classroom/get_course.usecase";
import { UpsertClassroomUseCase } from "../usecases/classrooms/upsert_classroom.usecase";
import { UpsertSubjectUseCase } from "../usecases/subjects/upsert_subject.usecase";
import { UpsertActivityUseCase } from "../usecases/activities/upsert_activity.usecase";
import { GetClassroomDetailsUseCase } from "../usecases/classrooms/get_classroom_details.usecase";
import { GetClassroomListByUserIdUseCase } from "../usecases/classrooms/get_classroom_list_by_userId.usecase";

export class GoogleClassroomService {
  private _dbClassroomList = new GetClassroomListByUserIdUseCase();
  constructor(
    private readonly _getCourseListUseCase: GetCourseListUseCase,
    private readonly _getCourseWorkUseCase: GetCourseWorkUseCase,
    private readonly _getAnnouncementsUseCase: GetAnnouncementsUseCase,
    private readonly _getCourseUseCase: GetCourseUseCase,
    private readonly _upsertClassroomUseCase: UpsertClassroomUseCase,
    private readonly _upsertSubjectUseCase: UpsertSubjectUseCase,
    private readonly _upsertActivityUseCase: UpsertActivityUseCase,
    private readonly _getClassroomDetailsUseCase: GetClassroomDetailsUseCase,
  ) {}

  async syncCourses() {
    try {
      const session = await auth();
      const accessToken = (session as any)?.access_token;
      const dbUserId = (session as any)?.db_user_id;

      if (!accessToken || !dbUserId) {
        throw new Error("Unauthorized: No access token found. Please sign in.");
      }
      const existingClassrooms = await this._dbClassroomList.execute(dbUserId);
      if (existingClassrooms && existingClassrooms.length > 0) {
        return existingClassrooms;
      }
      const courses = await this._getCourseListUseCase.execute({ accessToken });
      for (const course of courses) {
        if (!course.id) continue;

        const classroomDbId = await this._upsertClassroomUseCase.execute({
          googleClassroomId: course.id,
          userId: dbUserId,
          name: course.name || "Untitled Course",
          section: course.section || null,
          room: course.room || null,
          subject: course.subject || null,
          courseState: course.courseState || null,
          alternateLink: course.alternateLink || null,
        });

        if (!classroomDbId) continue;

        // Upsert Subject
        if (course.subject) {
          await this._upsertSubjectUseCase.execute({
            googleSubjectName: course.subject,
            userId: dbUserId,
          });
        }

        await this._syncActivitiesForClassroom(
          accessToken,
          course.id,
          classroomDbId,
        );
      }

      return await this._dbClassroomList.execute(dbUserId);
    } catch (error) {
      console.log(error, "error");
      throw error;
    }
  }

  async syncSingleCourse(courseId: string) {
    const session = await auth();
    const accessToken = (session as any)?.access_token;
    const dbUserId = (session as any)?.db_user_id;

    if (!accessToken || !dbUserId) {
      throw new Error("Unauthorized: No access token found. Please sign in.");
    }

    // Get the internal classroom ID from our DB
    let existingClassroom = await db
      .select({ id: classrooms.id })
      .from(classrooms)
      .where(eq(classrooms.googleClassroomId, courseId))
      .limit(1);

    let classroomDbId: string;

    if (existingClassroom.length === 0) {
      // If not found in DB, try to fetch it from Google Classroom first
      const course = await this._getCourseUseCase.execute({
        accessToken,
        courseId,
      });

      if (!course || !course.id) {
        throw new Error(
          "Classroom not found in Google Classroom. Please ensure the course ID is correct.",
        );
      }

      const newId = await this._upsertClassroomUseCase.execute({
        googleClassroomId: course.id,
        userId: dbUserId,
        name: course.name || "Untitled Course",
        section: course.section || null,
        room: course.room || null,
        subject: course.subject || null,
        courseState: course.courseState || null,
        alternateLink: course.alternateLink || null,
      });

      if (!newId) {
        throw new Error("Failed to sync classroom to database.");
      }
      classroomDbId = newId;
    } else {
      classroomDbId = existingClassroom[0].id;
    }

    await this._syncActivitiesForClassroom(
      accessToken,
      courseId,
      classroomDbId,
    );
    return true;
  }

  async getClassroomDetails(googleClassroomId: string) {
    return await this._getClassroomDetailsUseCase.execute({
      googleClassroomId,
    });
  }

  private async _syncActivitiesForClassroom(
    accessToken: string,
    googleClassroomId: string,
    classroomDbId: string,
  ) {
    // Fetch & Upsert Coursework
    const courseworkItems = await this._getCourseWorkUseCase.execute({
      accessToken,
      courseId: googleClassroomId,
    });

    for (const item of courseworkItems) {
      if (!item.id) continue;

      let dueDate = null;
      if (item.dueDate && item.dueTime) {
        dueDate = new Date(
          item.dueDate.year || new Date().getFullYear(),
          (item.dueDate.month || 1) - 1,
          item.dueDate.day || 1,
          item.dueTime.hours || 0,
          item.dueTime.minutes || 0,
        );
      }

      await this._upsertActivityUseCase.execute({
        googleActivityId: item.id,
        classroomId: classroomDbId,
        type: "coursework",
        title: item.title || "Untitled",
        description: item.description || null,
        dueDate: dueDate,
        state: item.state || null,
        alternateLink: item.alternateLink || null,
      });
    }

    // Fetch & Upsert Announcements
    const announcements = await this._getAnnouncementsUseCase.execute({
      accessToken,
      courseId: googleClassroomId,
    });

    for (const ann of announcements) {
      if (!ann.id) continue;

      await this._upsertActivityUseCase.execute({
        googleActivityId: ann.id,
        classroomId: classroomDbId,
        type: "announcement",
        title: "Announcement",
        description: ann.text || null,
        dueDate: null,
        state: ann.state || null,
        alternateLink: ann.alternateLink || null,
      });
    }
  }
}
