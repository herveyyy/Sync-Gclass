import { getAuthenticatedClassroomClient } from "@/external_apis/google/google-classroom.api";

export interface GetCourseInput {
  accessToken: string;
  courseId: string;
}

export class GetCourseUseCase {
  async execute(input: GetCourseInput): Promise<any> {
    try {
      const classroomClient = getAuthenticatedClassroomClient(
        input.accessToken,
      );
      const res = await classroomClient.courses.get({
        id: input.courseId,
      });
      return res.data;
    } catch (e) {
      throw new Error(`Failed to get course from Google: ${e}`);
    }
  }
}
