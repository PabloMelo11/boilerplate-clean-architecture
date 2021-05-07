import { User } from '@/entities/user/user';

import { CreateUserRequestDTO } from '@/usecases/createUser/dtos/CreateUserRequestDTO';

interface IUsersRepository {
  create(user: CreateUserRequestDTO): Promise<void>;
  findByEmail(email: string): Promise<CreateUserRequestDTO>;
  listAllUsers(except_current_user_id: string): Promise<CreateUserRequestDTO[]>;
  findById(user_id: string): Promise<CreateUserRequestDTO>;
  update(user: CreateUserRequestDTO): Promise<void>;
}

export { IUsersRepository };
