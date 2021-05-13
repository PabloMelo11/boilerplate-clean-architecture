import { Controller } from '@/adapters/presentation/protocols/Controller';

import { makeListUsersValidationFactory } from '@/infra/http/factories/validations/ListUsersValidationFactory';

import { UsersRepositoryInMemory } from '@/infra/repositories/inMemory/UsersRepository';

import { ListUsersUseCase } from '@/domain/usecases/listUsers/ListUsersUseCase';

import { ListUsersController } from '@/adapters/presentation/controllers/ListUsersController';

function makeListUsersControllerFactory(): Controller {
  const usersRepositoryInMemory = new UsersRepositoryInMemory();
  const listUsersUseCase = new ListUsersUseCase(usersRepositoryInMemory);

  const listUsersController = new ListUsersController(
    makeListUsersValidationFactory(),
    listUsersUseCase,
  );

  return listUsersController;
}

export { makeListUsersControllerFactory };
