import { GetUsersUseCase } from "../usecases/users/get_users.usecase";

export class UsersService {
  constructor(private readonly _getUsersUseCase: GetUsersUseCase) {}

  async getUsers() {
    return await this._getUsersUseCase.execute();
  }
}
