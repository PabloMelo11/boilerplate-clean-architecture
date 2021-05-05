import { User } from '@/entities/user/user';

import { IUsersRepository } from '@/usecases/_helpers_/repositories/IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  private static users: User[] = [];

  public async create(data: User): Promise<void> {
    UsersRepositoryInMemory.users.push(data);
  }

  public async findByEmail(email: string): Promise<User> {
    return UsersRepositoryInMemory.users.find(user => user.email === email);
  }

  public async listAllUsers(except_current_user_id: string): Promise<User[]> {
    return UsersRepositoryInMemory.users.filter(
      user => user.id !== except_current_user_id,
    );
  }

  public async findById(user_id: string): Promise<User> {
    return UsersRepositoryInMemory.users.find(user => user.id === user_id);
  }
}

export { UsersRepositoryInMemory };
