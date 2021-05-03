import { User } from '@/modules/accounts/domain/user/user';

interface IUsersRepository {
  create(user: User): Promise<void>;
  findByEmail(email: string): Promise<User>;
  listAllUsers(except_current_user: string): Promise<User[]>;
}

export { IUsersRepository };
