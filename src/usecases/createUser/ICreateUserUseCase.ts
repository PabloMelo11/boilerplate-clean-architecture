import { UserPropsDTO } from '@/entities/user/dtos/UserPropsDTO';
import { CreatedUserResponseDTO } from '@/usecases/createUser/dtos/CreatedUserResponseDTO';

interface ICreateUserUseCase {
  execute(data: UserPropsDTO): Promise<CreatedUserResponseDTO>;
}

export { ICreateUserUseCase };
