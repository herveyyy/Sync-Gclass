import { db } from "@/database";
import { classrooms, activities } from "@/database/schema";
import { eq, desc } from "drizzle-orm";

export interface GetClassroomDetailsInput {
  googleClassroomId: string;
}

export class GetClassroomDetailsUseCase {
  async execute(input: GetClassroomDetailsInput) {
    const classroomRows = await db
      .select()
      .from(classrooms)
      .where(eq(classrooms.googleClassroomId, input.googleClassroomId))
      .limit(1);

    if (classroomRows.length === 0) {
      return null;
    }

    const classroom = classroomRows[0];
    const activityRows = await db
      .select()
      .from(activities)
      .where(eq(activities.classroomId, classroom.id))
      .orderBy(desc(activities.createdAt));

    return {
      classroom,
      activities: activityRows,
    };
  }
}
