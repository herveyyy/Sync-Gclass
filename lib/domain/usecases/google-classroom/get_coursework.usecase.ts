import { getAuthenticatedClassroomClient } from "@/external_apis/google/google-classroom.api";

export interface GetCourseWorkInput {
  accessToken: string;
  courseId: string;
}

export class GetCourseWorkUseCase {
  async execute(input: GetCourseWorkInput): Promise<any[]> {
    try {
      const classroomClient = getAuthenticatedClassroomClient(input.accessToken);
      const res = await classroomClient.courses.courseWork.list({
        courseId: input.courseId,
      });
      return res.data.courseWork || [];
    } catch (e) {
      console.warn(`Could not fetch coursework for course ${input.courseId}:`, e);
      return [];
    }
  }
}
