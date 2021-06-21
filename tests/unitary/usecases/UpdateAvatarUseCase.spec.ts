import { join } from 'path';
import { createReadStream, createWriteStream, promises } from 'fs';

import { UsersRepositoryInMemory } from '@/infra/repositories/inMemory/UsersRepository';

import { StorageProviderInMemory } from '@/infra/providers/StorageProvider/inMemory/StorageProvider';

import { UpdateAvatarUserUseCase } from '@/domain/usecases/updateAvatarUser/UpdateAvatarUserUseCase';

import { AccountDoesNotExists } from '@/domain/usecases/_common_/errors/AccountDoesNotExists';

let usersRepositoryInMemory: UsersRepositoryInMemory;

let storageProviderInMemory: StorageProviderInMemory;

let updateAvatarUserUseCase: UpdateAvatarUserUseCase;

const name = 'John Doe';
const email = 'johndoe@example.com';
const password = '123456';
const driver_license = '123ABC';

describe('Update user avatar use case', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    storageProviderInMemory = new StorageProviderInMemory();

    updateAvatarUserUseCase = new UpdateAvatarUserUseCase(
      usersRepositoryInMemory,
      storageProviderInMemory,
    );
  });

  it('should be able to update user avatar', async () => {
    createReadStream(
      join(process.cwd(), 'tmp', 'avatar', 'placeholder.png'),
    ).pipe(createWriteStream(join(process.cwd(), 'tmp', 'avatar.png')));

    const user = await usersRepositoryInMemory.create({
      id: 'user_id',
      name,
      email,
      password,
      driver_license,
    });

    const user_updated = await updateAvatarUserUseCase.updateAvatar({
      user_id: user.id,
      avatar_file: 'avatar.png',
    });

    expect(user_updated.isRight()).toBeTruthy();

    expect(user_updated.value).toMatchObject({
      id: 'user_id',
      name,
      email,
      password,
      driver_license,
      avatar: 'avatar.png',
    });

    const file_path = join(process.cwd(), 'tmp', 'avatar', 'avatar.png');

    try {
      await promises.stat(file_path);
    } catch {
      return;
    }

    await promises.unlink(file_path);
  });

  it('should not be able to update user avatar when not exists user', async () => {
    const spyStorageSave = spyOn(storageProviderInMemory, 'save');

    const error_user_updated = await updateAvatarUserUseCase.updateAvatar({
      user_id: 'non-exists',
      avatar_file: 'avatar.png',
    });

    expect(error_user_updated.isLeft()).toBeTruthy();
    expect(error_user_updated.value).toEqual(new AccountDoesNotExists());

    expect(spyStorageSave).not.toHaveBeenCalled();
  });

  it('should be able to update user avatar when already exists avatar', async () => {
    const spyStorageDeleteFile = spyOn(storageProviderInMemory, 'delete');

    createReadStream(
      join(process.cwd(), 'tmp', 'avatar', 'placeholder.png'),
    ).pipe(createWriteStream(join(process.cwd(), 'tmp', 'avatar.png')));

    const user = await usersRepositoryInMemory.create({
      id: 'user_id',
      name,
      email,
      password,
      driver_license,
      avatar: 'test.png',
    });

    const user_updated = await updateAvatarUserUseCase.updateAvatar({
      user_id: user.id,
      avatar_file: 'avatar.png',
    });

    expect(user_updated.isRight()).toBeTruthy();

    expect(user_updated.value).toMatchObject({
      id: 'user_id',
      name,
      email,
      password,
      driver_license,
      avatar: 'avatar.png',
    });

    expect(spyStorageDeleteFile).toHaveBeenCalled();

    const file_path = join(process.cwd(), 'tmp', 'avatar', 'avatar.png');

    try {
      await promises.stat(file_path);
    } catch {
      return;
    }

    await promises.unlink(file_path);
  });
});
