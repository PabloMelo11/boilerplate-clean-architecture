import { Controller } from '@/adapters/presentation/protocols/Controller';

import {
  HttpResponse,
  clientError,
  serverError,
  ok,
} from '@/adapters/presentation/protocols/HttpResponse';

import { Validation } from '@/adapters/presentation/protocols/Validation';

import { RefreshTokenRequestDTO } from '@/usecases/refreshToken/dtos/RefreshTokenRequestDTO';

import { IRefreshTokenUseCase } from '@/usecases/refreshToken/IRefreshTokenUseCase';

class RefreshTokenController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly refreshTokenUseCase: IRefreshTokenUseCase,
  ) {}

  async handle({
    refresh_token,
  }: RefreshTokenRequestDTO): Promise<HttpResponse> {
    try {
      const error = this.validation.validate({ refresh_token });

      if (error) {
        return clientError(error);
      }

      const result = await this.refreshTokenUseCase.createNewRefreshToken({
        refresh_token,
      });

      if (result.isLeft()) {
        return clientError(result.value);
      }

      return ok(result.value);
    } catch (err) {
      return serverError(err);
    }
  }
}

export { RefreshTokenController };
