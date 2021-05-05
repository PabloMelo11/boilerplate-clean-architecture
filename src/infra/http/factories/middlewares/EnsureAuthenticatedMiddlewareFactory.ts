import { Middleware } from '@/adapters/presentation/protocols/Middleware';

import { TokenProviderJsonWebToken } from '@/infra/providers/TokenProvider/jsonwebtoken/TokenProvider';

import { EnsureAuthenticatedMiddleware } from '@/adapters/presentation/middlewares/authentication/EnsureAuthenticatedMiddleware';

function makeEnsureAuthenticatedMiddleware(): Middleware {
  const tokenProviderJsonWebToken = new TokenProviderJsonWebToken();

  const ensureAuthenticatedMiddleware = new EnsureAuthenticatedMiddleware(
    tokenProviderJsonWebToken,
  );

  return ensureAuthenticatedMiddleware;
}

export { makeEnsureAuthenticatedMiddleware };
