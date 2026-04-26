import { db } from "@/database";
import { subjects } from "@/database/schema";

export interface UpsertSubjectInput {
  googleSubjectName: string;
  userId: string;
}

export class UpsertSubjectUseCase {
  async execute(input: UpsertSubjectInput): Promise<void> {
    await db
      .insert(subjects)
      .values({
        googleSubjectName: input.googleSubjectName,
        userId: input.userId,
        name: input.googleSubjectName,
      })
      .onConflictDoUpdate({
        target: subjects.googleSubjectName,
        set: {
          name: input.googleSubjectName,
        },
      });
  }
}
