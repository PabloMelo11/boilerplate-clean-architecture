import { IUserPropsDTO } from '@/entities/user/dtos/IUserPropsDTO';
import { ICreatedUserResponseDTO } from '@/modules/accounts/useCases/createUser/dtos/ICreatedUserResponseDTO';

interface ICreateUserUseCase {
  execute(data: IUserPropsDTO): Promise<ICreatedUserResponseDTO>;
}

export { ICreateUserUseCase };
