import { Controller } from '@/adapters/presentation/protocols/Controller';

import {
  HttpResponse,
  clientError,
  serverError,
  ok,
} from '@/adapters/presentation/protocols/HttpResponse';

import { IRefreshTokenUseCase } from '@/usecases/refreshToken/IRefreshTokenUseCase';

class RefreshTokenController implements Controller {
  constructor(private readonly refreshTokenUseCase: IRefreshTokenUseCase) {}

  async handle(refresh_token: string): Promise<HttpResponse> {
    try {
      const result = await this.refreshTokenUseCase.createNewRefreshToken(
        refresh_token,
      );

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
