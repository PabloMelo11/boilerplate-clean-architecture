import { Middleware } from '@/adapters/presentation/protocols/Middleware';
import { EnsureAuthenticatedMiddleware } from '@/adapters/presentation/middlewares/authentication/EnsureAuthenticatedMiddleware';
import { TokenProviderJsonWebToken } from '@/infra/providers/TokenProvider/implementations/jsonwebtoken/TokenProvider';

function makeEnsureAuthenticatedMiddleware(): Middleware {
  const tokenProviderJsonWebToken = new TokenProviderJsonWebToken();

  const ensureAuthenticatedMiddleware = new EnsureAuthenticatedMiddleware(
    tokenProviderJsonWebToken,
  );

  return ensureAuthenticatedMiddleware;
}

export { makeEnsureAuthenticatedMiddleware };
