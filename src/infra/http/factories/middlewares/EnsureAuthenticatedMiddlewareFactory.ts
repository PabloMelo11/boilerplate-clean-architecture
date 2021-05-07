import { Middleware } from '@/adapters/presentation/protocols/Middleware';

import { UsersTokensRepositoryInMemory } from '@/infra/repositories/inMemory/UsersTokensRepository';

import { TokenProviderJsonWebToken } from '@/infra/providers/TokenProvider/jsonwebtoken/TokenProvider';

import { EnsureAuthenticatedMiddleware } from '@/adapters/presentation/middlewares/EnsureAuthenticatedMiddleware';

function makeEnsureAuthenticatedMiddleware(): Middleware {
  const usersTokensRepository = new UsersTokensRepositoryInMemory();
  const tokenProviderJsonWebToken = new TokenProviderJsonWebToken();

  const ensureAuthenticatedMiddleware = new EnsureAuthenticatedMiddleware(
    usersTokensRepository,
    tokenProviderJsonWebToken,
  );

  return ensureAuthenticatedMiddleware;
}

export { makeEnsureAuthenticatedMiddleware };
