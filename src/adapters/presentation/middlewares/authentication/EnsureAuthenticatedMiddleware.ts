import {
  serverError,
  forbidden,
  HttpResponse,
  ok,
} from '@/adapters/presentation/protocols/HttpResponse';

import { Middleware } from '@/adapters/presentation/protocols/Middleware';

import { AccessDeniedError } from '@/infra/http/errors/AccessDeniedError';

import { EnsureAuthenticateRequestDTO } from '@/adapters/presentation/middlewares/authentication/dtos/EnsureAuthenticateRequestDTO';
import { DecodeTokenDTO } from '@/infra/providers/TokenProvider/dtos/DecodeTokenDTO';

import { ITokenProvider } from '@/usecases/_helpers_/providers/ITokenProvider';

export class EnsureAuthenticatedMiddleware implements Middleware {
  constructor(private readonly tokenProvider: ITokenProvider) {}

  async handle(request: EnsureAuthenticateRequestDTO): Promise<HttpResponse> {
    try {
      const { accessToken } = request;

      if (accessToken) {
        try {
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
