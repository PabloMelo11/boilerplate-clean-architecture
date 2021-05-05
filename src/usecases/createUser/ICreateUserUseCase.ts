import { UserPropsDTO } from '@/entities/user/dtos/UserPropsDTO';
import { CreatedUserResponseDTO } from '@/usecases/createUser/dtos/CreatedUserResponseDTO';

interface ICreateUserUseCase {
  createUser(data: UserPropsDTO): Promise<CreatedUserResponseDTO>;
}

export { ICreateUserUseCase };
