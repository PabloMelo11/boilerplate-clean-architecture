import { join } from 'path';
import { promises } from 'fs';
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

describe('Update avatar user controller', () => {
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

  it('should be able to update user avatar', async () => {
    const { token } = await createUserTokenInDatabase();

    const file_path = join(process.cwd(), 'tmp', 'avatar', 'placeholder.png');

    const response = await request(app)
      .patch('/me/avatar')
      .set({
        'x-access-token': token,
      })
      .attach('avatar', file_path);

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({ avatar: expect.any(String) }),
    );

    expect(response.body.avatar).not.toBeUndefined();

    const avatar_path = join(
      process.cwd(),
      'tmp',
      'avatar',
      response.body.avatar,
    );

    try {
      await promises.stat(avatar_path);
    } catch {
      return;
    }

    await promises.unlink(avatar_path);
  });
});
