import { Middleware } from '@/adapters/presentation/protocols/Middleware';
import { EnsureAuthenticatedMiddleware } from '@/adapters/presentation/middlewares/authentication/EnsureAuthenticatedMiddleware';

function makeEnsureAuthenticatedMiddleware(): Middleware {
  const ensureAuthenticatedMiddleware = new EnsureAuthenticatedMiddleware();

  return ensureAuthenticatedMiddleware;
}

export { makeEnsureAuthenticatedMiddleware };
