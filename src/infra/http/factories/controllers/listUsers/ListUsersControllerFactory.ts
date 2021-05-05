import { Controller } from '@/adapters/presentation/protocols/Controller';

import { UsersRepositoryInMemory } from '@/infra/repositories/inMemory/UsersRepository';

import { ListUsersUseCase } from '@/usecases/listUsers/ListUsersUseCase';

import { ListUsersController } from '@/adapters/presentation/controllers/listUsers/ListUsersController';

function makeListUsersControllerFactory(): Controller {
  const usersRepository = new UsersRepositoryInMemory();
  const listUsersUseCase = new ListUsersUseCase(usersRepository);
  const listUsersController = new ListUsersController(listUsersUseCase);

  return listUsersController;
}

export { makeListUsersControllerFactory };
