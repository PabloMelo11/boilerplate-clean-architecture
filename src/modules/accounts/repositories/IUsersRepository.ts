import { User } from '@/entities/user/user';

import { IUserPropsDTO } from '@/entities/user/dtos/IUserPropsDTO';

interface IUsersRepository {
  create(user: IUserPropsDTO): Promise<void>;
  findByEmail(email: string): Promise<IUserPropsDTO>;
  listAllUsers(except_current_user: string): Promise<IUserPropsDTO[]>;
}

export { IUsersRepository };
