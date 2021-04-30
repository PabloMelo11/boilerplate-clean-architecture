import { User } from '@/modules/accounts/domain/user/user';

import { IUsersRepository } from '../../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  private static users: User[] = [];

  public async create(user: User): Promise<void> {
    UsersRepositoryInMemory.users.push(user);
  }

  public async findByEmail(email: string): Promise<User> {
    return UsersRepositoryInMemory.users.find(user => user.email === email);
  }

  public async listAllUsers(except_current_user: string): Promise<User[]> {
    return UsersRepositoryInMemory.users.filter(
      user => user.id !== except_current_user,
    );
  }
}

export { UsersRepositoryInMemory };
