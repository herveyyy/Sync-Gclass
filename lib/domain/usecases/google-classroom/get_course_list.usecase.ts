import { getAuthenticatedClassroomClient } from "@/external_apis/google/google-classroom.api";

export interface GetCourseListInput {
  accessToken: string;
}

export class GetCourseListUseCase {
  async execute(input: GetCourseListInput): Promise<any[]> {
    try {
      const classroomClient = getAuthenticatedClassroomClient(input.accessToken);
      const res = await classroomClient.courses.list({
        courseStates: ["ACTIVE"],
      });
      return res.data.courses || [];
    } catch (e) {
      throw new Error(`Failed to get course list from Google: ${e}`);
    }
  }
}
