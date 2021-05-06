import { Controller } from '@/adapters/presentation/protocols/Controller';

import { UsersRepositoryInMemory } from '@/infra/repositories/inMemory/UsersRepository';

import { StorageProviderInMemory } from '@/infra/providers/StorageProvider/inMemory/StorageProvider';

import { UpdateAvatarUserUseCase } from '@/usecases/updateAvatarUser/UpdateAvatarUserUseCase';

import { UpdateAvatarUserController } from '@/adapters/presentation/controllers/UpdateAvatarUserController';

function makeUpdateAvatarUserControllerFactory() {
  const usersRepository = new UsersRepositoryInMemory();

  const storageProviderInMemory = new StorageProviderInMemory();

  const updateAvatarUserUseCase = new UpdateAvatarUserUseCase(
    usersRepository,
    storageProviderInMemory,
  );

  const updateAvatarUserController = new UpdateAvatarUserController(
    updateAvatarUserUseCase,
  );

  return updateAvatarUserController;
}

export { makeUpdateAvatarUserControllerFactory };
