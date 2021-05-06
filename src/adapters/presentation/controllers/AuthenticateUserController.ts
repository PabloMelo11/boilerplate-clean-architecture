import { Controller } from '@/adapters/presentation/protocols/Controller';

import {
  HttpResponse,
  clientError,
  serverError,
  ok,
} from '@/adapters/presentation/protocols/HttpResponse';

import { IAuthenticateUserUseCase } from '@/usecases/authenticateUser/IAuthenticateUserUseCase';
import { AuthenticateUserRequestDTO } from '@/usecases/authenticateUser/dtos/AuthenticateUserRequestDTO';

class AuthenticateUserController implements Controller {
  constructor(
    private readonly authenticateUserUseCase: IAuthenticateUserUseCase,
  ) {}

  async handle(request: AuthenticateUserRequestDTO): Promise<HttpResponse> {
    try {
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