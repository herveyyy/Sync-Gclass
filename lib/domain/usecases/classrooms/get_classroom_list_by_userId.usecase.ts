import { db } from "@/database";
import { classrooms } from "@/database/schema";
import { and, eq, gt } from "drizzle-orm"; // Added 'and'

export class GetClassroomListByUserIdUseCase {
  private db = db;
  async execute(userId: string) {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const result = await this.db
      .select()
      .from(classrooms)
      .where(
        and(eq(classrooms.userId, userId), gt(classrooms.updatedAt, oneDayAgo)),
      );

    return result;
  }
}
