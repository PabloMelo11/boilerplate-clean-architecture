import { Controller } from '@/core/infra/Controller';

import {
  HttpResponse,
  clientError,
  conflict,
  serverError,
  ok,
} from '@/core/infra/HttpResponse';

import { CreateUserUseCase } from './CreateUserUseCase';

import { AccountAlreadyExistsError } from './errors/AccountAlreadyExists';

type CreateUserControllerRequest = {
  name: string;
  email: string;
  password: string;
  driver_license: string;
  avatar?: string;
};

class CreateUserController implements Controller {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async handle(request: CreateUserControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.createUserUseCase.execute(request);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case AccountAlreadyExistsError:
            return conflict(error);
          default:
            return clientError(error);
        }
      } else {
        const user = result.value;

        return ok(user);
      }
    } catch (err) {
      return serverError(err);
    }
  }
}

export { CreateUserController };
