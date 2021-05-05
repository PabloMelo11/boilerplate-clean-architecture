import { Controller } from '@/adapters/presentation/protocols/Controller';

import {
  HttpResponse,
  clientError,
  serverError,
  ok,
} from '@/adapters/presentation/protocols/HttpResponse';

import { IListUsersUseCase } from '@/usecases/listUsers/IListUsersUseCase';
import { UserViewModel } from '@/adapters/presentation/controllers/views/UserViewModel';

import { ListUsersControllerDTO } from '@/adapters/presentation/controllers/listUsers/dtos/ListUsersControllerDTO';

class ListUsersController implements Controller {
  constructor(private readonly listUsersUseCase: IListUsersUseCase) {}

  async handle(
    request: ListUsersControllerDTO,
  ): Promise<HttpResponse<UserViewModel[]>> {
    try {
      const result = await this.listUsersUseCase.execute(request);

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
