import { Controller } from '@/adapters/presentation/protocols/Controller';

import { UsersRepositoryInMemory } from '@/infra/repositories/inMemory/UsersRepository';

import { ShowProfileUserUseCase } from '@/usecases/showProfileUser/ShowProfileUserUseCase';

import { ShowProfileUserController } from '@/adapters/presentation/controllers/showProfileUser/ShowProfileUserController';

function makeShowProfileUser(): Controller {
  const usersRepository = new UsersRepositoryInMemory();
  const showProfileUserUseCase = new ShowProfileUserUseCase(usersRepository);

  const showProfileUserController = new ShowProfileUserController(
    showProfileUserUseCase,
  );

  return showProfileUserController;
}

export { makeShowProfileUser };
