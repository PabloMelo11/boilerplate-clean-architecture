import { Controller } from '@/shared/infra/Controller';

import {
  HttpResponse,
  clientError,
  serverError,
  ok,
} from '@/shared/infra/HttpResponse';

import { ListUsersUseCase } from '@/modules/accounts/useCases/listUsers/ListUsersUseCase';

import { IListUsersControllerDTO } from '@/modules/accounts/useCases/listUsers/dtos/IListUsersControllerDTO';

class ListUsersController implements Controller {
  constructor(private readonly listUsersUseCase: ListUsersUseCase) {}

  async handle(request: IListUsersControllerDTO): Promise<HttpResponse> {
    try {
      const result = await this.listUsersUseCase.execute(request);

      if (result.isLeft()) {
        return clientError(result.value);
      }

      const users = result.value;

      return ok(users);
    } catch (err) {
      return serverError(err);
    }
  }
}

export { ListUsersController };
