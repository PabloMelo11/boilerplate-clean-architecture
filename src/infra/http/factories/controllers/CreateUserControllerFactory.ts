import { Controller } from '@/adapters/presentation/protocols/Controller';

import { UsersRepositoryInMemory } from '@/infra/repositories/inMemory/UsersRepository';
import { HashProviderBCrypt } from '@/infra/providers/HashProvider/bcrypt/HashProvider';
import { UUIDProvider } from '@/infra/providers/UUIDProvider/uuid/UUIDProvider';

import { CreateUserUseCase } from '@/usecases/createUser/CreateUserUseCase';

import { CreateUserController } from '@/adapters/presentation/controllers/CreateUserController';

function makeCreateUserControllerFactory(): Controller {
  const usersRepositoryInMemory = new UsersRepositoryInMemory();
  const hashProviderBCrypt = new HashProviderBCrypt();
  const uuidProvider = new UUIDProvider();

  const createUserUseCase = new CreateUserUseCase(
    usersRepositoryInMemory,
    hashProviderBCrypt,
    uuidProvider,
  );

  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
}

export { makeCreateUserControllerFactory };
