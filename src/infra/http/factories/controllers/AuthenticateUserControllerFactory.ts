import { Controller } from '@/adapters/presentation/protocols/Controller';

import { UsersRepositoryInMemory } from '@/infra/repositories/inMemory/UsersRepository';
import { UsersTokensRepositoryInMemory } from '@/infra/repositories/inMemory/UsersTokensRepository';

import { TokenProviderJsonWebToken } from '@/infra/providers/TokenProvider/jsonwebtoken/TokenProvider';
import { HashProviderBCrypt } from '@/infra/providers/HashProvider/bcrypt/HashProvider';
import { DateProviderDayjs } from '@/infra/providers/DateProvider/dayjs/DateProvider';
import { UUIDProvider } from '@/infra/providers/UUIDProvider/uuid/UUIDProvider';

import { AuthenticateUserUseCase } from '@/usecases/authenticateUser/AuthenticateUserUseCase';

import { AuthenticateUserController } from '@/adapters/presentation/controllers/AuthenticateUserController';

function makeAuthenticateUserControllerFactory(): Controller {
  const usersRepositoryInMemory = new UsersRepositoryInMemory();
  const usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

  const tokenProviderJsonWebToken = new TokenProviderJsonWebToken();
  const hashProviderBCrypt = new HashProviderBCrypt();
  const dateProviderDayjs = new DateProviderDayjs();
  const uuidProvider = new UUIDProvider();

  const authenticateUserUseCase = new AuthenticateUserUseCase(
    usersRepositoryInMemory,
    usersTokensRepositoryInMemory,
    tokenProviderJsonWebToken,
    hashProviderBCrypt,
    dateProviderDayjs,
    uuidProvider,
  );

  const authenticateUserController = new AuthenticateUserController(
    authenticateUserUseCase,
  );

  return authenticateUserController;
}

export { makeAuthenticateUserControllerFactory };
