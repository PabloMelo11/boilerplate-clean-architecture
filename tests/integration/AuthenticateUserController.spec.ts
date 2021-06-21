import request from 'supertest';

import { app } from '@/infra/http/app';

import { UsersRepositoryInMemory } from '@/infra/repositories/inMemory/UsersRepository';

import { UUIDProviderInMemory } from '@/infra/providers/UUIDProvider/inMemory/UUIDProvider';
import { HashProviderBCrypt } from '@/infra/providers/HashProvider/bcrypt/HashProvider';

let usersRepositoryInMemory: UsersRepositoryInMemory;

let uuidProviderInMemory: UUIDProviderInMemory;
let hashProviderBCrypt: HashProviderBCrypt;

describe('Authenticate User Controller', () => {
  beforeAll(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    uuidProviderInMemory = new UUIDProviderInMemory();
    hashProviderBCrypt = new HashProviderBCrypt();

    await createUserInDatabase();
  });

  async function createUserInDatabase() {
    await usersRepositoryInMemory.create({
      id: uuidProviderInMemory.generateUUID(),
      name: 'John Doe',
      email: 'johndoe@example.com',
      driver_license: 'ABC123',
      password: await hashProviderBCrypt.generateHash('123456'),
    });
  }

  it('should be able to authenticate user sending email and password', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
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

  it('should not be able to authenticate user when not sending params', async () => {
    const response = await request(app).post('/sessions');

    expect(response.status).toBe(400);
  });

  it('should not be able to authenticate user sending email or password incorrect', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456789',
    });

    expect(response.status).toBe(400);
  });
});
