import { Controller } from '@/adapters/presentation/protocols/Controller';

import {
  HttpResponse,
  clientError,
  serverError,
  ok,
} from '@/adapters/presentation/protocols/HttpResponse';

import { Validation } from '@/adapters/presentation/protocols/Validation';

import { UserViewModel } from '@/adapters/presentation/controllers/views/UserViewModel';

import { ListUsersRequestDTO } from '@/usecases/listUsers/dtos/ListUsersRequestDTO';

import { IListUsersUseCase } from '@/usecases/listUsers/IListUsersUseCase';

class ListUsersController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly listUsersUseCase: IListUsersUseCase,
  ) {}

  async handle(
    request: ListUsersRequestDTO,
  ): Promise<HttpResponse<UserViewModel[]>> {
    try {
      const error = this.validation.validate(request);

      if (error) {
        return clientError(error);
      }

      const result = await this.listUsersUseCase.listUsers(request);

      if (result.isLeft()) {
        return clientError(result.value);
      }

      const all_users = result.value;

      const users_view_model = UserViewModel.mapCollection(all_users);

      return ok(users_view_model);
    } catch (err) {
      return serverError(err);
    }
  }
}

export { ListUsersController };
