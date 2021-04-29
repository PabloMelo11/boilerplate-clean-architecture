import { User } from '@/modules/accounts/domain/user/user';

interface IUsersRepository {
  create(user: User): Promise<void>;
  findByEmail(email: string): Promise<User>;
}

export { IUsersRepository };
