import {
  serverError,
  forbidden,
  HttpResponse,
  ok,
} from '@/adapters/presentation/protocols/HttpResponse';

import { Middleware } from '@/adapters/presentation/protocols/Middleware';

import { AccessDeniedError } from '@/infra/http/errors/AccessDeniedError';

import { DecodeTokenDTO } from '@/usecases/_helpers_/providers/dtos/DecodeTokenDTO';
import { ITokenProvider } from '@/usecases/_helpers_/providers/ITokenProvider';

type EnsureAuthenticateRequestDTO = {
  accessToken: string;
};

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
