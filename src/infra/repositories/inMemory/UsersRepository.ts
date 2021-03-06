import { UserPropsDTO } from '@/domain/entities/user/dtos/UserPropsDTO';

import { IUsersRepository } from '@/domain/usecases/_common_/repositories/IUsersRepository';

import { CreateUserRequestDTO } from '@/domain/usecases/createUser/dtos/CreateUserRequestDTO';

class UsersRepositoryInMemory implements IUsersRepository {
  private static users: CreateUserRequestDTO[] = [];

  public async create(data: CreateUserRequestDTO): Promise<UserPropsDTO> {
    UsersRepositoryInMemory.users.push(data);

    return data;
  }

  public async findByEmail(email: string): Promise<UserPropsDTO> {
    return UsersRepositoryInMemory.users.find(user => user.email === email);
  }

  public async listAllUsers(
    except_current_user_id: string,
  ): Promise<UserPropsDTO[]> {
    return UsersRepositoryInMemory.users.filter(
      user => user.id !== except_current_user_id,
    );
  }

  public async findById(user_id: string): Promise<UserPropsDTO> {
    return UsersRepositoryInMemory.users.find(user => user.id === user_id);
  }

  public async update(data: CreateUserRequestDTO): Promise<UserPropsDTO> {
    const userIndex = UsersRepositoryInMemory.users.findIndex(
      user => user.id === data.id,
    );

    UsersRepositoryInMemory.users[userIndex] = data;

    return UsersRepositoryInMemory.users[userIndex];
  }
}

export { UsersRepositoryInMemory };
