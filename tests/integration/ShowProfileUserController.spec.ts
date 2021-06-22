import request from 'supertest';

import { app } from '@/infra/http/app';

import { UsersRepositoryInMemory } from '@/infra/repositories/inMemory/UsersRepository';
import { UsersTokensRepositoryInMemory } from '@/infra/repositories/inMemory/UsersTokensRepository';

import { UUIDProviderInMemory } from '@/infra/providers/UUIDProvider/inMemory/UUIDProvider';
import { HashProviderBCrypt } from '@/infra/providers/HashProvider/bcrypt/HashProvider';
import { DateProviderDayjs } from '@/infra/providers/DateProvider/dayjs/DateProvider';
import { TokenProviderJsonWebToken } from '@/infra/providers/TokenProvider/jsonwebtoken/TokenProvider';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;

let uuidProviderInMemory: UUIDProviderInMemory;
let hashProviderBCrypt: HashProviderBCrypt;
let dateProviderDayjs: DateProviderDayjs;
let tokenProviderJsonWebToken: TokenProviderJsonWebToken;

describe('Reset password controller', () => {
  beforeAll(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

    uuidProviderInMemory = new UUIDProviderInMemory();
    hashProviderBCrypt = new HashProviderBCrypt();
    dateProviderDayjs = new DateProviderDayjs();
    tokenProviderJsonWebToken = new TokenProviderJsonWebToken();
  });

  async function createUserTokenInDatabase() {
    const user = await usersRepositoryInMemory.create({
      id: uuidProviderInMemory.generateUUID(),
      name: 'John Doe',
      email: 'johndoe@example.com',
      driver_license: 'ABC123',
      password: await hashProviderBCrypt.generateHash('123456'),
    });

    const expires_date = '30d';
    const expires_date_user_token = dateProviderDayjs.addDays(30);

    const token = tokenProviderJsonWebToken.generateToken({
      expiresIn: expires_date,
      secret: '1121200616PaGoThe2UsCOD',
      subject: user.id,
      payload: { email: user.email },
    });

    await usersTokensRepositoryInMemory.create({
      user_id: user.id,
      type: 'refresh_token',
      token,
      expires_date: expires_date_user_token,
    });

    return { user, token };
  }

  it('should be able to show profile user', async () => {
    const { token } = await createUserTokenInDatabase();

    const response = await request(app).get('/me').set({
      'x-access-token': token,
    });

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'John Doe',
        email: 'johndoe@example.com',
      }),
    );
  });

  it('should not be able to show profile when not exists user', async () => {
    const token = tokenProviderJsonWebToken.generateToken({
      expiresIn: '30d',
      secret: '1121200616PaGoThe2UsCOD',
      subject: 'user_id',
    });

    await usersTokensRepositoryInMemory.create({
      user_id: 'user_id',
      type: 'refresh_token',
      token,
      expires_date: dateProviderDayjs.addDays(30),
    });

    const response = await request(app).get('/me').set({
      'x-access-token': token,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'The account does not exists.' });
  });

  it('should not be able to show profile when not send params', async () => {
    const response = await request(app).get('/me');

    expect(response.status).toBe(403);
  });
});
