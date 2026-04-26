"use server";

import { GoogleClassroomController } from "@/lib/domain/controllers/google-classroom/google-classroom.controller";
import { GoogleClassroomService } from "@/lib/domain/services/google-classroom.service";
import { GetCourseListUseCase } from "@/lib/domain/usecases/google-classroom/get_course_list.usecase";
import { GetCourseWorkUseCase } from "@/lib/domain/usecases/google-classroom/get_coursework.usecase";
import { GetAnnouncementsUseCase } from "@/lib/domain/usecases/google-classroom/get_announcements.usecase";
import { UpsertClassroomUseCase } from "@/lib/domain/usecases/classrooms/upsert_classroom.usecase";
import { UpsertSubjectUseCase } from "@/lib/domain/usecases/subjects/upsert_subject.usecase";
import { UpsertActivityUseCase } from "@/lib/domain/usecases/activities/upsert_activity.usecase";
import { GetClassroomDetailsUseCase } from "@/lib/domain/usecases/classrooms/get_classroom_details.usecase";

export async function createGoogleClassroomController(): Promise<GoogleClassroomController> {
  return new GoogleClassroomController(
    new GoogleClassroomService(
      new GetCourseListUseCase(),
      new GetCourseWorkUseCase(),
      new GetAnnouncementsUseCase(),
      new UpsertClassroomUseCase(),
      new UpsertSubjectUseCase(),
      new UpsertActivityUseCase(),
      new GetClassroomDetailsUseCase(),
    ),
  );
}
