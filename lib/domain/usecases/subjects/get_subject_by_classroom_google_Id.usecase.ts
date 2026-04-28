import { db } from "@/database";
import { subjects } from "@/database/schema";
import { eq } from "drizzle-orm";

export class GetSubjectByClassroomGoogleIdUseCase {
  private db = db;
  async execute(googleClassroomId: string): Promise<unknown> {
    try {
      const res = this.db
        .select()
        .from(subjects)
        .where(eq(subjects.googleSubjectName, googleClassroomId));
      return res;
    } catch (error) {
      console.error("Error getting subject by classroom google id:", error);
      throw error;
    }
  }
}
