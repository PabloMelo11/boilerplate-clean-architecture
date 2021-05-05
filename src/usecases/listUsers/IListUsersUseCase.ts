import { IListAllUsersResponseDTO } from '@/modules/accounts/useCases/listUsers/dtos/IListUsersResponseDTO';
import { IListUsersRequestDTO } from '@/modules/accounts/useCases/listUsers/dtos/IListUsersRequestDTO';

interface IListUsersUseCase {
  execute(data: IListUsersRequestDTO): Promise<IListAllUsersResponseDTO>;
}

export { IListUsersUseCase };
