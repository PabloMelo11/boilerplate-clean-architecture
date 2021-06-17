import { UsersRepositoryInMemory } from '@/infra/repositories/inMemory/UsersRepository';
import { HashProviderInMemory } from '@/infra/providers/HashProvider/inMemory/HashProvider';
import { UUIDProviderInMemory } from '@/infra/providers/UUIDProvider/inMemory/UUIDProvider';

import { CreateUserUseCase } from '@/domain/usecases/createUser/CreateUserUseCase';

import { AccountAlreadyExistsError } from '@/domain/usecases/_common_/errors/AccountAlreadyExists';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let hashProviderInMemory: HashProviderInMemory;
let uuidProviderInMemory: UUIDProviderInMemory;

let createUserUseCase: CreateUserUseCase;

const name = 'John Doe';
const email = 'johndoe@example.com';
const password = '123456';
const driver_license = '123ABC';

describe('Create user use case', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    hashProviderInMemory = new HashProviderInMemory();
    uuidProviderInMemory = new UUIDProviderInMemory();

    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
      hashProviderInMemory,
      uuidProviderInMemory,
    );
  });

  it('should to be able to create a new user', async () => {
    const user = await createUserUseCase.createUser({
      name,
      email,
      password,
      driver_license,
    });

    expect(user.isRight()).toBeTruthy();
  });

  it('should not be able to create a new user when send user value incorrect', async () => {
    const user = await createUserUseCase.createUser({
      name: 'A',
      email: 'abc@abc.com',
      password: '123',
      driver_license,
    });

    expect(user.isLeft()).toBeTruthy();
  });

  it('should not be able to create a new user when exists user with same email', async () => {
    await createUserUseCase.createUser({
      name,
      email,
      password,
      driver_license,
    });

    const user_error = await createUserUseCase.createUser({
      name,
      email,
      password,
      driver_license,
    });

    expect(user_error.value).toEqual(new AccountAlreadyExistsError(email));
  });
});
