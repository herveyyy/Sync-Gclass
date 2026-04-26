import { db } from "@/database";
import { activities } from "@/database/schema";

export interface UpsertActivityInput {
  googleActivityId: string;
  classroomId: string;
  type: "announcement" | "coursework";
  title: string;
  description: string | null;
  dueDate: Date | null;
  state: string | null;
  alternateLink: string | null;
}

export class UpsertActivityUseCase {
  async execute(input: UpsertActivityInput): Promise<void> {
    await db
      .insert(activities)
      .values({
        googleActivityId: input.googleActivityId,
        classroomId: input.classroomId,
        type: input.type,
        title: input.title,
        description: input.description,
        dueDate: input.dueDate,
        state: input.state,
        alternateLink: input.alternateLink,
      })
      .onConflictDoUpdate({
        target: activities.googleActivityId,
        set: {
          title: input.title,
          description: input.description,
          dueDate: input.dueDate,
          state: input.state,
          alternateLink: input.alternateLink,
          updatedAt: new Date(),
        },
      });
  }
}
