import { Controller } from '@/adapters/presentation/protocols/Controller';

import { UsersRepositoryInMemory } from '@/infra/repositories/inMemory/UsersRepository';
import { HashProviderBCrypt } from '@/infra/providers/HashProvider/bcrypt/HashProvider';

import { CreateUserUseCase } from '@/usecases/createUser/CreateUserUseCase';

import { CreateUserController } from '@/adapters/presentation/controllers/CreateUserController';

function makeCreateUserControllerFactory(): Controller {
  const usersRepository = new UsersRepositoryInMemory();
  const hashProviderBCrypt = new HashProviderBCrypt();

  const createUserUseCase = new CreateUserUseCase(
    usersRepository,
    hashProviderBCrypt,
  );

  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
}

export { makeCreateUserControllerFactory };
