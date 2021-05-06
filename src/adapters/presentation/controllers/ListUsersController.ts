import { Controller } from '@/adapters/presentation/protocols/Controller';

import {
  HttpResponse,
  clientError,
  serverError,
  ok,
} from '@/adapters/presentation/protocols/HttpResponse';

import { UserViewModel } from '@/adapters/presentation/controllers/views/UserViewModel';

import { ListUsersRequestDTO } from '@/usecases/listUsers/dtos/ListUsersRequestDTO';

import { IListUsersUseCase } from '@/usecases/listUsers/IListUsersUseCase';

class ListUsersController implements Controller {
  constructor(private readonly listUsersUseCase: IListUsersUseCase) {}

  async handle(
    request: ListUsersRequestDTO,
  ): Promise<HttpResponse<UserViewModel[]>> {
    try {
      const result = await this.listUsersUseCase.listUsers(request);

      if (result.isLeft()) {
        return clientError(result.value);
      }

      const users = result.value;

      const usersView = UserViewModel.mapCollection(users);

      return ok(usersView);
    } catch (err) {
      return serverError(err);
    }
  }
}

export { ListUsersController };
