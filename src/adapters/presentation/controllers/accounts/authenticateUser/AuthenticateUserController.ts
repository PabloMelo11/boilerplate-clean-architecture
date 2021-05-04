import { Controller } from '@/adapters/presentation/protocols/Controller';

import {
  HttpResponse,
  clientError,
  serverError,
  ok,
} from '@/adapters/presentation/protocols/HttpResponse';

import { IAuthenticateUserUseCase } from '@/modules/accounts/useCases/authenticateUser/IAuthenticateUserUseCase';

import { AuthenticateUserDTO } from '@/adapters/presentation/controllers/accounts/authenticateUser/dtos/AuthenticateUserDTO';

class AuthenticateUserController implements Controller {
  constructor(
    private readonly authenticateUserUseCase: IAuthenticateUserUseCase,
  ) {}

  async handle(request: AuthenticateUserDTO): Promise<HttpResponse> {
    try {
      const result = await this.authenticateUserUseCase.execute(request);

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
