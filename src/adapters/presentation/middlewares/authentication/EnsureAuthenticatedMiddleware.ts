import { decode } from 'jsonwebtoken';

import {
  serverError,
  forbidden,
  HttpResponse,
  ok,
} from '@/adapters/presentation/protocols/HttpResponse';

import { Middleware } from '@/adapters/presentation/protocols/Middleware';

import { AccessDeniedError } from '@/infra/http/errors/AccessDeniedError';

import { EnsureAuthenticateRequestDTO } from '@/adapters/presentation/middlewares/authentication/dtos/EnsureAuthenticateRequestDTO';
import { DecodedDTO } from '@/adapters/presentation/middlewares/authentication/dtos/DecodedDTO';

export class EnsureAuthenticatedMiddleware implements Middleware {
  constructor() {}

  async handle(request: EnsureAuthenticateRequestDTO): Promise<HttpResponse> {
    try {
      const { accessToken } = request;

      if (accessToken) {
        try {
          const decoded = decode(accessToken) as DecodedDTO;

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
