import { User } from '@/entities/user/user';

import { CreateUserRequestDTO } from '@/usecases/createUser/dtos/CreateUserRequestDTO';

interface IUsersRepository {
  create(user: CreateUserRequestDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  listAllUsers(except_current_user_id: string): Promise<User[]>;
  findById(user_id: string): Promise<User>;
  update(user: User): Promise<void>;
}

export { IUsersRepository };
