import { Controller } from '@/core/infra/Controller';
import { UsersRepositoryInMemory } from '@/infra/repositories/accounts/implementations/inMemory/UsersRepository';
import { CreateUserUseCase } from '@/modules/accounts/useCases/createUser/CreateUserUseCase';
import { CreateUserController } from '@/modules/accounts/useCases/createUser/CreateUserController';

function makeCreateUserControllerFactory(): Controller {
  const usersRepository = new UsersRepositoryInMemory();
  const createUserUseCase = new CreateUserUseCase(usersRepository);
  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
}

export { makeCreateUserControllerFactory };
