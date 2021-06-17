import { UsersRepositoryInMemory } from '@/infra/repositories/inMemory/UsersRepository';

import { UUIDProviderInMemory } from '@/infra/providers/UUIDProvider/inMemory/UUIDProvider';

import { ShowProfileUserUseCase } from '@/domain/usecases/showProfileUser/ShowProfileUserUseCase';

import { AccountDoesNotExists } from '@/domain/usecases/_common_/errors/AccountDoesNotExists';

let usersRepositoryInMemory: UsersRepositoryInMemory;

let uuidProviderInMemory: UUIDProviderInMemory;

let showProfileUserUseCase: ShowProfileUserUseCase;

const name = 'John Doe';
const email = 'johndoe@example.com';
const password = '123456';
const driver_license = '123ABC';

describe('Show user profile use case', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    uuidProviderInMemory = new UUIDProviderInMemory();

    showProfileUserUseCase = new ShowProfileUserUseCase(
      usersRepositoryInMemory,
    );
  });

  it('should be able to show user profile', async () => {
    const id = uuidProviderInMemory.generateUUID();

    const user = await usersRepositoryInMemory.create({
      id,
      name,
      email,
      password,
      driver_license,
    });

    const profile = await showProfileUserUseCase.loadProfile({
      user_id: user.id,
    });

    expect(profile.isRight()).toBeTruthy();

    expect(profile.value).toMatchObject({
      id,
      name: user.name,
      email: user.email,
      password: user.password,
      driver_license: user.driver_license,
    });
  });

  it('should not be able to show profile when not exists user', async () => {
    const profile = await showProfileUserUseCase.loadProfile({
      user_id: 'non-exists',
    });

    expect(profile.value).toEqual(new AccountDoesNotExists());
  });
});
