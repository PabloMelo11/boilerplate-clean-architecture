import { UserPropsDTO } from '@/domain/entities/user/dtos/UserPropsDTO';
import { CreatedUserResponseDTO } from '@/domain/usecases/createUser/dtos/CreatedUserResponseDTO';

interface ICreateUserUseCase {
  createUser(data: UserPropsDTO): Promise<CreatedUserResponseDTO>;
}

export { ICreateUserUseCase };
