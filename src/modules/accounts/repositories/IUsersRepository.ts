import { User } from '@/entities/user/user';

import { IUserPropsDTO } from '@/entities/user/dtos/IUserPropsDTO';

interface IUsersRepository {
  create(user: IUserPropsDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  listAllUsers(except_current_user_id: string): Promise<User[]>;
}

export { IUsersRepository };
