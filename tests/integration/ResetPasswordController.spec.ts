import request from 'supertest';

import { app } from '@/infra/http/app';

import { UsersRepositoryInMemory } from '@/infra/repositories/inMemory/UsersRepository';
import { UsersTokensRepositoryInMemory } from '@/infra/repositories/inMemory/UsersTokensRepository';

import { UUIDProviderInMemory } from '@/infra/providers/UUIDProvider/inMemory/UUIDProvider';
import { HashProviderBCrypt } from '@/infra/providers/HashProvider/bcrypt/HashProvider';
import { DateProviderDayjs } from '@/infra/providers/DateProvider/dayjs/DateProvider';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;

let uuidProviderInMemory: UUIDProviderInMemory;
let hashProviderBCrypt: HashProviderBCrypt;
let dateProviderDayjs: DateProviderDayjs;

describe('Reset password controller', () => {
  beforeAll(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

    uuidProviderInMemory = new UUIDProviderInMemory();
    hashProviderBCrypt = new HashProviderBCrypt();
    dateProviderDayjs = new DateProviderDayjs();
  });

  async function createUserTokenInDatabase(expires_date?: Date) {
    const user = await usersRepositoryInMemory.create({
      id: uuidProviderInMemory.generateUUID(),
      name: 'John Doe',
      email: 'johndoe@example.com',
      driver_license: 'ABC123',
      password: await hashProviderBCrypt.generateHash('123456'),
    });

    const token = uuidProviderInMemory.generateUUID();

    await usersTokensRepositoryInMemory.create({
      user_id: user.id,
      type: 'forgot_password',
      token,
      expires_date: expires_date ?? new Date(),
    });

    return { user, token };
  }

  it('should be able to reset password sending token and new password', async () => {
    const { token } = await createUserTokenInDatabase();

    const response = await request(app).post('/reset-password').send({
      password: '123456789',
      password_confirmation: '123456789',
      token,
    });

    expect(response.status).toBe(204);
  });

  it('should not be able to reset password when not sending correct params', async () => {
    const { token } = await createUserTokenInDatabase();

    const response = await request(app).post('/reset-password').send({
      password: '123456789',
      password_confirmation: '1234546',
      token,
    });

    expect(response.status).toBe(400);
  });

  it('should not be able to reset password when token expired', async () => {
    const expires_date = dateProviderDayjs.addHours(4);

    const { token } = await createUserTokenInDatabase(expires_date);

    const response = await request(app).post('/reset-password').send({
      password: '123456789',
      password_confirmation: '123456789',
      token,
    });

    expect(response.status).toBe(400);
  });
});
