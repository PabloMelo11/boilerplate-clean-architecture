import { CreateUserRequestDTO } from '@/usecases/createUser/dtos/CreateUserRequestDTO';
import { UserPropsDTO } from '@/entities/user/dtos/UserPropsDTO';

interface IUsersRepository {
  create(user: CreateUserRequestDTO): Promise<void>;
  findByEmail(email: string): Promise<UserPropsDTO>;
  listAllUsers(except_current_user_id: string): Promise<UserPropsDTO[]>;
  findById(user_id: string): Promise<UserPropsDTO>;
  update(user: CreateUserRequestDTO): Promise<void>;
}

export { IUsersRepository };
