import { db } from "@/database";
import { classrooms } from "@/database/schema";

export interface UpsertClassroomInput {
  googleClassroomId: string;
  userId: string;
  name: string;
  section: string | null;
  room: string | null;
  subject: string | null;
  courseState: string | null;
  alternateLink: string | null;
}

export class UpsertClassroomUseCase {
  async execute(input: UpsertClassroomInput): Promise<string | undefined> {
    const classroomRows = await db
      .insert(classrooms)
      .values({
        googleClassroomId: input.googleClassroomId,
        userId: input.userId,
        name: input.name,
        section: input.section,
        room: input.room,
        subject: input.subject,
        courseState: input.courseState,
        alternateLink: input.alternateLink,
      })
      .onConflictDoUpdate({
        target: classrooms.googleClassroomId,
        set: {
          name: input.name,
          section: input.section,
          room: input.room,
          subject: input.subject,
          courseState: input.courseState,
          alternateLink: input.alternateLink,
          updatedAt: new Date(),
        },
      })
      .returning({ id: classrooms.id });

    return classroomRows[0]?.id;
  }
}
