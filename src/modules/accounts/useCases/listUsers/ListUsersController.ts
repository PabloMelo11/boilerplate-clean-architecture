import { Controller } from '@/core/infra/Controller';

import {
  HttpResponse,
  clientError,
  conflict,
  serverError,
  ok,
} from '@/core/infra/HttpResponse';

import { AccountDoesNotExists } from './errors/AccountDoesNotExists';

import { ListUsersUseCase } from './ListUsersUseCase';

type ListUsersControllerRequest = {
  except_current_user_id: string;
};

class ListUsersController implements Controller {
  constructor(private readonly listUsersUseCase: ListUsersUseCase) {}

  async handle(request: ListUsersControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.listUsersUseCase.execute(request);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case AccountDoesNotExists:
            return conflict(error);
          default:
            return clientError(error);
        }
      } else {
        const users = result.value;

        return ok(users);
      }
    } catch (err) {
      return serverError(err);
    }
  }
}

export { ListUsersController };
