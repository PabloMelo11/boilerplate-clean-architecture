import { Controller } from '@/core/infra/Controller';

import {
  HttpResponse,
  clientError,
  conflict,
  created,
  serverError,
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
            clientError(error);
        }
      } else {
        return created();
      }
    } catch (err) {
      return serverError(err);
    }
  }
}

export { CreateUserController };
