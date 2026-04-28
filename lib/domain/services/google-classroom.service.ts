import { auth } from "@/auth";
import { db } from "@/database";
import { classrooms } from "@/database/schema";
import { eq } from "drizzle-orm";
import { GetCourseListUseCase } from "../usecases/google-classroom/get_course_list.usecase";
import { GetCourseWorkUseCase } from "../usecases/google-classroom/get_coursework.usecase";
import { GetAnnouncementsUseCase } from "../usecases/google-classroom/get_announcements.usecase";
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
    private readonly _upsertClassroomUseCase: UpsertClassroomUseCase,
    private readonly _upsertSubjectUseCase: UpsertSubjectUseCase,
    private readonly _upsertActivityUseCase: UpsertActivityUseCase,
    private readonly _getClassroomDetailsUseCase: GetClassroomDetailsUseCase,
  ) {}

  async syncCourses() {
    const session = await auth();
    const accessToken = (session as any)?.access_token;
    const dbUserId = (session as any)?.db_user_id;

    if (!accessToken || !dbUserId) {
      throw new Error("Unauthorized: No access token found. Please sign in.");
    }
    const classrooms = await this._dbClassroomList.execute(dbUserId);
    if (classrooms) {
      return classrooms;
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

    return courses;
  }

  async syncSingleCourse(courseId: string) {
    const session = await auth();
    const accessToken = (session as any)?.access_token;
    const dbUserId = (session as any)?.db_user_id;

    if (!accessToken || !dbUserId) {
      throw new Error("Unauthorized: No access token found. Please sign in.");
    }

    // Get the internal classroom ID from our DB
    const existingClassroom = await db
      .select({ id: classrooms.id })
      .from(classrooms)
      .where(eq(classrooms.googleClassroomId, courseId))
      .limit(1);

    if (existingClassroom.length === 0) {
      throw new Error(
        "Classroom not found in database. Please sync all courses first.",
      );
    }

    const classroomDbId = existingClassroom[0].id;
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
