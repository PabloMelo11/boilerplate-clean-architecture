import { Left } from '@/shared/logic/Either';

import { UserTokens } from '@/domain/entities/userTokens/userTokens';

import { UsersRepositoryInMemory } from '@/infra/repositories/inMemory/UsersRepository';
import { UsersTokensRepositoryInMemory } from '@/infra/repositories/inMemory/UsersTokensRepository';

import { MailProviderInMemory } from '@/infra/providers/MailProvider/inMemory/MailProvider';
import { DateProviderInMemory } from '@/infra/providers/DateProvider/inMemory/DateProvider';
import { UUIDProviderInMemory } from '@/infra/providers/UUIDProvider/inMemory/UUIDProvider';

import { SendForgotPasswordMailUseCase } from '@/domain/usecases/sendForgotPasswordMail/SendForgotPasswordMailUseCase';

import { InvalidTypeError } from '@/domain/entities/_common_/errors/InvalidTypeError';
import { AccountDoesNotExists } from '@/domain/usecases/_common_/errors/AccountDoesNotExists';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;

let mailProviderInMemory: MailProviderInMemory;
let dateProviderInMemory: DateProviderInMemory;
let uuidProviderInMemory: UUIDProviderInMemory;

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

const name = 'John Doe';
const email = 'johndoe@example.com';
const password = '123456';
const driver_license = '123ABC';

describe('Send forgot password mail use case', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

    mailProviderInMemory = new MailProviderInMemory();
    dateProviderInMemory = new DateProviderInMemory();
    uuidProviderInMemory = new UUIDProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      mailProviderInMemory,
      dateProviderInMemory,
      uuidProviderInMemory,
    );
  });

  it('should be able to send forgot password mail correct', async () => {
    const spySendMail = spyOn(mailProviderInMemory, 'sendMail');

    const id = uuidProviderInMemory.generateUUID();

    await usersRepositoryInMemory.create({
      id,
      name,
      email,
      password,
      driver_license,
    });

    const result = await sendForgotPasswordMailUseCase.sendForgotPasswordMail({
      email,
    });

    expect(result.isRight()).toBeTruthy();
    expect(spySendMail).toBeCalled();
  });

  it('should not be able to send forgot password when does not exists user', async () => {
    const spySendMail = spyOn(mailProviderInMemory, 'sendMail');

    const result = await sendForgotPasswordMailUseCase.sendForgotPasswordMail({
      email: 'johndoe2@example.com',
    });

    expect(result.isLeft()).toBeTruthy();

    expect(result.value).toEqual(new AccountDoesNotExists());
    expect(spySendMail).not.toBeCalled();
  });

  it('should not be able to send forgot password when user token is incorrect', async () => {
    jest.spyOn(UserTokens, 'create').mockImplementation(() => {
      return new Left(new InvalidTypeError('wrong_type'));
    });

    const spySendMail = spyOn(mailProviderInMemory, 'sendMail');

    const id = uuidProviderInMemory.generateUUID();

    await usersRepositoryInMemory.create({
      id,
      name,
      email,
      password,
      driver_license,
    });

    const result = await sendForgotPasswordMailUseCase.sendForgotPasswordMail({
      email,
    });

    expect(result.isLeft()).toBeTruthy();
    expect(spySendMail).not.toBeCalled();
  });
});
