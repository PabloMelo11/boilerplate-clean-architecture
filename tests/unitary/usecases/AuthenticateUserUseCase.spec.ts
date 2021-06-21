import { Left } from '@/shared/logic/Either';

import { UserTokens } from '@/domain/entities/userTokens/userTokens';

import { UsersRepositoryInMemory } from '@/infra/repositories/inMemory/UsersRepository';
import { UsersTokensRepositoryInMemory } from '@/infra/repositories/inMemory/UsersTokensRepository';

import { TokenProviderInMemory } from '@/infra/providers/TokenProvider/inMemory/TokenProvider';
import { HashProviderInMemory } from '@/infra/providers/HashProvider/inMemory/HashProvider';
import { DateProviderInMemory } from '@/infra/providers/DateProvider/inMemory/DateProvider';
import { UUIDProviderInMemory } from '@/infra/providers/UUIDProvider/inMemory/UUIDProvider';

import { AuthenticateUserUseCase } from '@/domain/usecases/authenticateUser/AuthenticateUserUseCase';

import { InvalidTypeError } from '@/domain/entities/_common_/errors/InvalidTypeError';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;

let tokenProviderInMemory: TokenProviderInMemory;
let hashProviderInMemory: HashProviderInMemory;
let dateProviderInMemory: DateProviderInMemory;
let uuidProviderInMemory: UUIDProviderInMemory;

let authenticateUserUseCase: AuthenticateUserUseCase;

const name = 'John Doe';
const email = 'johndoe@example.com';
const password = '123456';
const driver_license = '123ABC';

describe('Authenticate user use case', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

    tokenProviderInMemory = new TokenProviderInMemory();
    hashProviderInMemory = new HashProviderInMemory();
    dateProviderInMemory = new DateProviderInMemory();
    uuidProviderInMemory = new UUIDProviderInMemory();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      tokenProviderInMemory,
      hashProviderInMemory,
      dateProviderInMemory,
      uuidProviderInMemory,
    );
  });

  it('should be able to authenticate user and return token, refresh token and user data', async () => {
    const id = uuidProviderInMemory.generateUUID();

    const user = await usersRepositoryInMemory.create({
      id,
      name,
      email,
      password,
      driver_license,
    });

    const user_authenticate = await authenticateUserUseCase.authenticate({
      email,
      password,
    });

    expect(user_authenticate.isRight()).toBeTruthy();

    expect(user_authenticate.value).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: {
          name: 'John Doe',
          email: 'johndoe@example.com',
        },
        refresh_token: expect.any(String),
      }),
    );
  });

  it('should not be able to authenticate user when send email incorrect', async () => {
    const user_authenticate = await authenticateUserUseCase.authenticate({
      email: 'email-incorrect',
      password,
    });

    expect(user_authenticate.isLeft()).toBeTruthy();
  });

  it('should not be able to authenticate user when send password incorrect', async () => {
    const user_authenticate = await authenticateUserUseCase.authenticate({
      email,
      password: '123',
    });

    expect(user_authenticate.isLeft()).toBeTruthy();
  });

  it('should not be able to authenticate user when not exist user by email', async () => {
    const user_authenticate = await authenticateUserUseCase.authenticate({
      email: 'doesnotexists@example.com',
      password,
    });

    expect(user_authenticate.isLeft()).toBeTruthy();
  });

  it('should not be able to authenticate user when not exist user by password', async () => {
    const user_authenticate = await authenticateUserUseCase.authenticate({
      email,
      password: '123456789',
    });

    expect(user_authenticate.isLeft()).toBeTruthy();
  });

  it('should not be able to authenticate user when user token is wrong', async () => {
    jest.spyOn(UserTokens, 'create').mockImplementation(() => {
      return new Left(new InvalidTypeError('wrong_type'));
    });

    const id = uuidProviderInMemory.generateUUID();

    await usersRepositoryInMemory.create({
      id,
      name,
      email,
      password,
      driver_license,
    });

    const user_authenticate = await authenticateUserUseCase.authenticate({
      email,
      password,
    });

    expect(user_authenticate.isLeft()).toBeTruthy();
  });
});
