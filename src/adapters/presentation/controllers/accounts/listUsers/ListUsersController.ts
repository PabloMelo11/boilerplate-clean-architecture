import { Controller } from '@/adapters/presentation/protocols/Controller';

import {
  HttpResponse,
  clientError,
  serverError,
  ok,
} from '@/adapters/presentation/protocols/HttpResponse';

import { ListUsersUseCase } from '@/modules/accounts/useCases/listUsers/ListUsersUseCase';
import { UserViewModel } from '@/adapters/presentation/controllers/accounts/views/UserViewModel';

import { IListUsersControllerDTO } from '@/modules/accounts/useCases/listUsers/dtos/IListUsersControllerDTO';

class ListUsersController implements Controller {
  constructor(private readonly listUsersUseCase: ListUsersUseCase) {}

  async handle(
    request: IListUsersControllerDTO,
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
