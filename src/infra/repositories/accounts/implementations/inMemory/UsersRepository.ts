import { User } from '@/modules/accounts/domain/user/user';

import { IUsersRepository } from '../../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  constructor(public users: User[] = []) {}

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }
}

export { UsersRepositoryInMemory };
