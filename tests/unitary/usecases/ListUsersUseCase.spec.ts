import { UsersRepositoryInMemory } from '@/infra/repositories/inMemory/UsersRepository';

import { UUIDProviderInMemory } from '@/infra/providers/UUIDProvider/inMemory/UUIDProvider';

import { ListUsersUseCase } from '@/domain/usecases/listUsers/ListUsersUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;

let uuidProviderInMemory: UUIDProviderInMemory;

let listUsersUseCase: ListUsersUseCase;

const name = 'John Doe';
const email = 'johndoe@example.com';
const password = '123456';
const driver_license = '123ABC';

describe('List users use case', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    uuidProviderInMemory = new UUIDProviderInMemory();

    listUsersUseCase = new ListUsersUseCase(usersRepositoryInMemory);
  });

  it('should be able to list all users', async () => {
    const id = uuidProviderInMemory.generateUUID();

    const user = await usersRepositoryInMemory.create({
      id,
      name,
      email,
      password,
      driver_license,
    });

    const users = await listUsersUseCase.listUsers({
      except_current_user_id: user.id,
    });

    expect(users.isRight()).toBeTruthy();
  });
});
