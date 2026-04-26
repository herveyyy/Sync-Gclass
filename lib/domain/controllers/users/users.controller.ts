import { UserSelect } from "@/lib/entities/users.type";
import { UsersService } from "@/lib/domain/services/users.service";
import { IUsersController } from "./users.interface";

export class UsersController implements IUsersController {
  constructor(private readonly _usersService: UsersService) {}

  async getUsers(): Promise<UserSelect[]> {
    try {
      const result = await this._usersService.getUsers();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
