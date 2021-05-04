import { Controller } from '@/adapters/presentation/protocols/Controller';
import { UsersRepositoryInMemory } from '@/infra/repositories/accounts/inMemory/UsersRepository';
import { HashProviderBCrypt } from '@/infra/providers/HashProvider/implementations/bcrypt/HashProvider';
import { CreateUserUseCase } from '@/modules/accounts/useCases/createUser/CreateUserUseCase';
import { CreateUserController } from '@/adapters/presentation/controllers/accounts/createUser/CreateUserController';

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
