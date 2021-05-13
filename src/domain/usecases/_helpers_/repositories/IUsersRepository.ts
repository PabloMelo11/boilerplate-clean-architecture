import { CreateUserRequestDTO } from '@/domain/usecases/createUser/dtos/CreateUserRequestDTO';
import { UserPropsDTO } from '@/domain/entities/user/dtos/UserPropsDTO';

interface IUsersRepository {
  create(user: CreateUserRequestDTO): Promise<UserPropsDTO>;
  findByEmail(email: string): Promise<UserPropsDTO>;
  listAllUsers(except_current_user_id: string): Promise<UserPropsDTO[]>;
  findById(user_id: string): Promise<UserPropsDTO>;
  update(user: CreateUserRequestDTO): Promise<UserPropsDTO>;
}

export { IUsersRepository };
