import { User } from '@/entities/user/user';

import { IUsersRepository } from '@/usecases/_helpers_/repositories/IUsersRepository';

import { CreateUserRequestDTO } from '@/usecases/createUser/dtos/CreateUserRequestDTO';

class UsersRepositoryInMemory implements IUsersRepository {
  private static users: CreateUserRequestDTO[] = [];

  public async create(data: CreateUserRequestDTO): Promise<void> {
    UsersRepositoryInMemory.users.push(data);
  }

  public async findByEmail(email: string): Promise<CreateUserRequestDTO> {
    return UsersRepositoryInMemory.users.find(user => user.email === email);
  }

  public async listAllUsers(
    except_current_user_id: string,
  ): Promise<CreateUserRequestDTO[]> {
    return UsersRepositoryInMemory.users.filter(
      user => user.id !== except_current_user_id,
    );
  }

  public async findById(user_id: string): Promise<CreateUserRequestDTO> {
    return UsersRepositoryInMemory.users.find(user => user.id === user_id);
  }

  public async update(data: CreateUserRequestDTO): Promise<void> {
    const userIndex = UsersRepositoryInMemory.users.findIndex(
      user => user.id === data.id,
    );

    UsersRepositoryInMemory.users[userIndex] = data;
  }
}

export { UsersRepositoryInMemory };
