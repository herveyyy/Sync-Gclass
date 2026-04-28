import { db } from "@/database";
import { subjects } from "@/database/schema";

export interface UpsertSubjectInput {
  googleSubjectName: string;
  userId: string;
}

export class UpsertSubjectUseCase {
  async execute(input: UpsertSubjectInput): Promise<void> {
    try {
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
    } catch (error) {
      console.error("Error upserting subject:", error);
      throw error;
    }
  }

  async upsertSubjectsForUser(userId: string, googleSubjectNames: string[]) {
    for (const subjectName of googleSubjectNames) {
      await this.execute({
        googleSubjectName: subjectName,
        userId,
      });
    }
  }
}
