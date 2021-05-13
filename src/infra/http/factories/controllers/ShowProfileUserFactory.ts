import { Controller } from '@/adapters/presentation/protocols/Controller';

import { UsersRepositoryInMemory } from '@/infra/repositories/inMemory/UsersRepository';

import { ShowProfileUserUseCase } from '@/domain/usecases/showProfileUser/ShowProfileUserUseCase';

import { ShowProfileUserController } from '@/adapters/presentation/controllers/ShowProfileUserController';

function makeShowProfileUser(): Controller {
  const usersRepositoryInMemory = new UsersRepositoryInMemory();
  const showProfileUserUseCase = new ShowProfileUserUseCase(
    usersRepositoryInMemory,
  );

  const showProfileUserController = new ShowProfileUserController(
    showProfileUserUseCase,
  );

  return showProfileUserController;
}

export { makeShowProfileUser };
