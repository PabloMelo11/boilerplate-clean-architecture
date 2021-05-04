import { Controller } from '@/adapters/presentation/protocols/Controller';

import { UsersRepositoryInMemory } from '@/infra/repositories/accounts/inMemory/UsersRepository';
import { UsersTokensRepositoryInMemory } from '@/infra/repositories/accounts/inMemory/UsersTokensRepository';

import { TokenProviderJsonWebToken } from '@/infra/providers/TokenProvider/implementations/jsonwebtoken/TokenProvider';
import { HashProviderBCrypt } from '@/infra/providers/HashProvider/implementations/bcrypt/HashProvider';
import { DateProviderDayjs } from '@/infra/providers/DateProvider/implementations/dayjs/DateProvider';

import { AuthenticateUserUseCase } from '@/modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase';
import { AuthenticateUserController } from '@/adapters/presentation/controllers/accounts/authenticateUser/AuthenticateUserController';

function makeAuthenticateUserControllerFactory(): Controller {
  const usersRepository = new UsersRepositoryInMemory();
  const usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

  const tokenProviderJsonWebToken = new TokenProviderJsonWebToken();
  const hashProviderBCrypt = new HashProviderBCrypt();
  const dateProviderDayjs = new DateProviderDayjs();

  const authenticateUserUseCase = new AuthenticateUserUseCase(
    usersRepository,
    usersTokensRepositoryInMemory,
    tokenProviderJsonWebToken,
    hashProviderBCrypt,
    dateProviderDayjs,
  );

  const authenticateUserController = new AuthenticateUserController(
    authenticateUserUseCase,
  );

  return authenticateUserController;
}

export { makeAuthenticateUserControllerFactory };
