import request from 'supertest';

import { app } from '@/infra/http/app';

import { UsersRepositoryInMemory } from '@/infra/repositories/inMemory/UsersRepository';

import { UUIDProviderInMemory } from '@/infra/providers/UUIDProvider/inMemory/UUIDProvider';
import { HashProviderBCrypt } from '@/infra/providers/HashProvider/bcrypt/HashProvider';

let usersRepositoryInMemory: UsersRepositoryInMemory;

let uuidProviderInMemory: UUIDProviderInMemory;
let hashProviderBCrypt: HashProviderBCrypt;

describe('Create User Controller', () => {
  beforeAll(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    uuidProviderInMemory = new UUIDProviderInMemory();
    hashProviderBCrypt = new HashProviderBCrypt();
  });

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'admin',
      email: 'admin@rentx.com',
      password: '124534',
      driver_license: '123456',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to create a new user when not send params', async () => {
    const response = await request(app).post('/users').send({
      name: 'admin',
      email: 'admin@rentx.com',
      password: '124534',
    });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a new user when already exists user with email', async () => {
    await usersRepositoryInMemory.create({
      id: uuidProviderInMemory.generateUUID(),
      name: 'John Doe',
      email: 'johndoe@example.com',
      driver_license: 'ABC123',
      password: await hashProviderBCrypt.generateHash('123456'),
    });

    const response = await request(app).post('/users').send({
      name: 'admin',
      email: 'admin@rentx.com',
      password: '124534',
      driver_license: '123456',
    });

    expect(response.status).toBe(400);
  });
});
