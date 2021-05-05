import { User } from '@/entities/user/user';

import { UserPropsDTO } from '@/entities/user/dtos/UserPropsDTO';

interface IUsersRepository {
  create(user: UserPropsDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  listAllUsers(except_current_user_id: string): Promise<User[]>;
}

export { IUsersRepository };
