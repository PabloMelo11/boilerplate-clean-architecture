import {
  serverError,
  forbidden,
  HttpResponse,
  ok,
} from '@/adapters/presentation/protocols/HttpResponse';

import { Middleware } from '@/adapters/presentation/protocols/Middleware';

import { AccessDeniedError } from '@/adapters/presentation/errors/AccessDeniedError';

import { DecodeTokenDTO } from '@/domain/usecases/_helpers_/providers/dtos/DecodeTokenDTO';

import { ITokenProvider } from '@/domain/usecases/_helpers_/providers/ITokenProvider';
import { IUsersTokensRepository } from '@/domain/usecases/_helpers_/repositories/IUsersTokensRepository';

type EnsureAuthenticateRequestDTO = {
  accessToken: string;
};

export class EnsureAuthenticatedMiddleware implements Middleware {
  constructor(
    private readonly usersTokensRepository: IUsersTokensRepository,
    private readonly tokenProvider: ITokenProvider,
  ) {}

  async handle(request: EnsureAuthenticateRequestDTO): Promise<HttpResponse> {
    try {
      const { accessToken } = request;

      if (accessToken) {
        try {
          const token = await this.usersTokensRepository.findByToken(
            accessToken,
          );

          if (!token) {
            return forbidden(new AccessDeniedError());
          }

          const decoded = this.tokenProvider.decode(
            accessToken,
          ) as DecodeTokenDTO;

          return ok({ user_id: decoded.sub });
        } catch (err) {
          return forbidden(new AccessDeniedError());
        }
      }

      return forbidden(new AccessDeniedError());
    } catch (error) {
      return serverError(error);
    }
  }
}
