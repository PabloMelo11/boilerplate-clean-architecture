import { Controller } from '@/adapters/presentation/protocols/Controller';

import { UsersRepositoryInMemory } from '@/infra/repositories/inMemory/UsersRepository';

import { ListUsersUseCase } from '@/usecases/listUsers/ListUsersUseCase';

import { ListUsersController } from '@/adapters/presentation/controllers/ListUsersController';

function makeListUsersControllerFactory(): Controller {
  const usersRepositoryInMemory = new UsersRepositoryInMemory();
  const listUsersUseCase = new ListUsersUseCase(usersRepositoryInMemory);
  const listUsersController = new ListUsersController(listUsersUseCase);

  return listUsersController;
}

export { makeListUsersControllerFactory };
