import { User } from '@/entities/user/user';

import { IUsersRepository } from '@/modules/accounts/repositories/IUsersRepository';

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
      user => user._id !== except_current_user_id,
    );
  }
}

export { UsersRepositoryInMemory };
