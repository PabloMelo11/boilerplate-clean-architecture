import { UsersRepositoryInMemory } from '@/infra/repositories/inMemory/UsersRepository';
import { UsersTokensRepositoryInMemory } from '@/infra/repositories/inMemory/UsersTokensRepository';

import { DateProviderInMemory } from '@/infra/providers/DateProvider/inMemory/DateProvider';
import { HashProviderInMemory } from '@/infra/providers/HashProvider/inMemory/HashProvider';
import { UUIDProviderInMemory } from '@/infra/providers/UUIDProvider/inMemory/UUIDProvider';

import { ResetPasswordUseCase } from '@/domain/usecases/resetPassword/ResetPasswordUseCase';
import { AuthenticateUserUseCase } from '@/domain/usecases/authenticateUser/AuthenticateUserUseCase';

import { TokenDoesNotExists } from '@/domain/usecases/_common_/errors/TokenDoesNotExists';
import { TokenExpired } from '@/domain/usecases/_common_/errors/TokenExpired';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;

let dateProviderInMemory: DateProviderInMemory;
let hashProviderInMemory: HashProviderInMemory;
let uuidProviderInMemory: UUIDProviderInMemory;

let resetPasswordUseCase: ResetPasswordUseCase;

const name = 'John Doe';
const email = 'johndoe@example.com';
const password = '123456';
const driver_license = '123ABC';

describe('Reset password use case', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

    dateProviderInMemory = new DateProviderInMemory();
    hashProviderInMemory = new HashProviderInMemory();

    uuidProviderInMemory = new UUIDProviderInMemory();

    resetPasswordUseCase = new ResetPasswordUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProviderInMemory,
      hashProviderInMemory,
    );
  });

  it('should be able to reset password use case', async () => {
    const user_id = uuidProviderInMemory.generateUUID();
    const user_token_id = uuidProviderInMemory.generateUUID();
    const token = uuidProviderInMemory.generateUUID();
    const expires_date = dateProviderInMemory.addHours(3);

    await usersRepositoryInMemory.create({
      id: user_id,
      email,
      name,
      driver_license,
      password,
    });

    await usersTokensRepositoryInMemory.create({
      user_id,
      token,
      id: user_token_id,
      type: 'forgot_password',
      expires_date,
    });

    const reset_password_result = await resetPasswordUseCase.resetPassword({
      password: '123456678',
      token,
    });

    expect(reset_password_result.isRight()).toBeTruthy();
  });

  it('should not be able to reset password when password value object is invalid', async () => {
    const user_id = uuidProviderInMemory.generateUUID();
    const user_token_id = uuidProviderInMemory.generateUUID();
    const token = uuidProviderInMemory.generateUUID();
    const expires_date = dateProviderInMemory.addHours(3);

    await usersRepositoryInMemory.create({
      id: user_id,
      email,
      name,
      driver_license,
      password,
    });

    await usersTokensRepositoryInMemory.create({
      user_id,
      token,
      id: user_token_id,
      type: 'forgot_password',
      expires_date,
    });

    const reset_password_result = await resetPasswordUseCase.resetPassword({
      password: '123',
      token,
    });

    expect(reset_password_result.isLeft()).toBeTruthy();
  });

  it('should not be able to reset password when token does not exists', async () => {
    const user_id = uuidProviderInMemory.generateUUID();
    const user_token_id = uuidProviderInMemory.generateUUID();
    const token = uuidProviderInMemory.generateUUID();
    const expires_date = dateProviderInMemory.addHours(3);

    await usersRepositoryInMemory.create({
      id: user_id,
      email,
      name,
      driver_license,
      password,
    });

    await usersTokensRepositoryInMemory.create({
      user_id,
      token,
      id: user_token_id,
      type: 'forgot_password',
      expires_date,
    });

    const reset_password_result = await resetPasswordUseCase.resetPassword({
      password: '123456789',
      token: 'invalid-token',
    });

    expect(reset_password_result.isLeft()).toBeTruthy();

    expect(reset_password_result.value).toEqual(new TokenDoesNotExists());
  });

  it('should bot be able to reset password when token expired with more one day', async () => {
    jest.spyOn(dateProviderInMemory, 'compareInDays').mockImplementation(() => {
      return 1;
    });

    const user_id = uuidProviderInMemory.generateUUID();
    const user_token_id = uuidProviderInMemory.generateUUID();
    const token = uuidProviderInMemory.generateUUID();
    const expires_date = dateProviderInMemory.addHours(3);

    await usersRepositoryInMemory.create({
      id: user_id,
      email,
      name,
      driver_license,
      password,
    });

    await usersTokensRepositoryInMemory.create({
      user_id,
      token,
      id: user_token_id,
      type: 'forgot_password',
      expires_date,
    });

    const reset_password_result = await resetPasswordUseCase.resetPassword({
      password: '123456678',
      token,
    });

    expect(reset_password_result.isLeft()).toBeTruthy();

    expect(reset_password_result.value).toEqual(new TokenExpired());
  });

  it('should bot be able to reset password when token expired with more three hours', async () => {
    jest
      .spyOn(dateProviderInMemory, 'compareInHours')
      .mockImplementation(() => {
        return 4;
      });

    const user_id = uuidProviderInMemory.generateUUID();
    const user_token_id = uuidProviderInMemory.generateUUID();
    const token = uuidProviderInMemory.generateUUID();
    const expires_date = dateProviderInMemory.addHours(3);

    await usersRepositoryInMemory.create({
      id: user_id,
      email,
      name,
      driver_license,
      password,
    });

    await usersTokensRepositoryInMemory.create({
      user_id,
      token,
      id: user_token_id,
      type: 'forgot_password',
      expires_date,
    });

    const reset_password_result = await resetPasswordUseCase.resetPassword({
      password: '123456678',
      token,
    });

    expect(reset_password_result.isLeft()).toBeTruthy();

    expect(reset_password_result.value).toEqual(new TokenExpired());
  });
});
