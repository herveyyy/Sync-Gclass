import { db } from "@/database";
import { users } from "@/database/schema";

export class GetUsersUseCase {
  private db = db;
  async execute(): Promise<unknown> {
    try {
      const result = await "";
      return result;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
