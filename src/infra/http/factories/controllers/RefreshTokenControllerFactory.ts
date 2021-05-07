import { UsersTokensRepositoryInMemory } from '@/infra/repositories/inMemory/UsersTokensRepository';

import { TokenProviderJsonWebToken } from '@/infra/providers/TokenProvider/jsonwebtoken/TokenProvider';
import { DateProviderDayjs } from '@/infra/providers/DateProvider/dayjs/DateProvider';

import { RefreshTokenUseCase } from '@/usecases/refreshToken/RefreshTokenUseCase';

import { RefreshTokenController } from '@/adapters/presentation/controllers/RefreshTokenController';

function makeRefreshTokenControllerFactory() {
  const usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

  const tokenProviderJsonWebToken = new TokenProviderJsonWebToken();
  const dateProviderDayjs = new DateProviderDayjs();

  const refreshTokenUseCase = new RefreshTokenUseCase(
    usersTokensRepositoryInMemory,
    tokenProviderJsonWebToken,
    dateProviderDayjs,
  );

  const refreshTokenController = new RefreshTokenController(
    refreshTokenUseCase,
  );

  return refreshTokenController;
}

export { makeRefreshTokenControllerFactory };
