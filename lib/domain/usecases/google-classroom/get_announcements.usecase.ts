import { getAuthenticatedClassroomClient } from "@/external_apis/google/google-classroom.api";

export interface GetAnnouncementsInput {
  accessToken: string;
  courseId: string;
}

export class GetAnnouncementsUseCase {
  async execute(input: GetAnnouncementsInput): Promise<any[]> {
    try {
      const classroomClient = getAuthenticatedClassroomClient(input.accessToken);
      const res = await classroomClient.courses.announcements.list({
        courseId: input.courseId,
      });
      return res.data.announcements || [];
    } catch (e) {
      console.warn(`Could not fetch announcements for course ${input.courseId}:`, e);
      return [];
    }
  }
}
