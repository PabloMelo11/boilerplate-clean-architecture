import request from 'supertest';

import { app } from '@/infra/http/app';

import { UsersRepositoryInMemory } from '@/infra/repositories/inMemory/UsersRepository';

import { UUIDProviderInMemory } from '@/infra/providers/UUIDProvider/inMemory/UUIDProvider';
import { HashProviderBCrypt } from '@/infra/providers/HashProvider/bcrypt/HashProvider';

let usersRepositoryInMemory: UsersRepositoryInMemory;

let uuidProviderInMemory: UUIDProviderInMemory;
let hashProviderBCrypt: HashProviderBCrypt;

describe('List Users Controller', () => {
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

  it('should be able to list all users', async () => {
    const user = await usersRepositoryInMemory.create({
      id: uuidProviderInMemory.generateUUID(),
      name: 'John Doe',
      email: 'johndoe2@example.com',
      driver_license: 'ABC123',
      password: await hashProviderBCrypt.generateHash('123456'),
    });

    const response = await request(app).get('/users').send({
      except_current_user_id: user.id,
    });

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: 'johndoe@example.com',
        }),
      ]),
    );
  });

  it('should not be able to list all users when not send params', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(400);
  });
});
