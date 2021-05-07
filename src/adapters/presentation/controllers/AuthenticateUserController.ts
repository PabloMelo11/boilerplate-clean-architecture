import { Controller } from '@/adapters/presentation/protocols/Controller';

import {
  HttpResponse,
  clientError,
  serverError,
  ok,
} from '@/adapters/presentation/protocols/HttpResponse';

import { Validation } from '@/adapters/presentation/protocols/Validation';

import { IAuthenticateUserUseCase } from '@/usecases/authenticateUser/IAuthenticateUserUseCase';
import { AuthenticateUserRequestDTO } from '@/usecases/authenticateUser/dtos/AuthenticateUserRequestDTO';

class AuthenticateUserController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly authenticateUserUseCase: IAuthenticateUserUseCase,
  ) {}

  async handle(request: AuthenticateUserRequestDTO): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);

      if (error) {
        return clientError(error);
      }

      const result = await this.authenticateUserUseCase.authenticate(request);

      if (result.isLeft()) {
        return clientError(result.value);
      }

      return ok(result.value);
    } catch (err) {
      return serverError(err);
    }
  }
}

export { AuthenticateUserController };
