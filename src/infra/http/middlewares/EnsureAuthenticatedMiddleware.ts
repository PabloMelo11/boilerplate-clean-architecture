import { decode } from 'jsonwebtoken';

import {
  serverError,
  forbidden,
  HttpResponse,
  ok,
} from '@/adapters/presentation/protocols/HttpResponse';

import { Middleware } from '@/adapters/presentation/protocols/Middleware';

import { AccessDeniedError } from '@/infra/http/errors/AccessDeniedError';

type EnsureAuthenticatedMiddlewareRequest = {
  accessToken: string;
};

type DecodedJwt = {
  sub: string;
};

export class EnsureAuthenticatedMiddleware implements Middleware {
  constructor() {}

  async handle(
    request: EnsureAuthenticatedMiddlewareRequest,
  ): Promise<HttpResponse> {
    try {
      const { accessToken } = request;

      if (accessToken) {
        try {
          const decoded = decode(accessToken) as DecodedJwt;

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

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string;
  };
}
