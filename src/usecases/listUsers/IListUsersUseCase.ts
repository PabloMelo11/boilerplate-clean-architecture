import { IListAllUsersResponseDTO } from '@/usecases/listUsers/dtos/ListUsersResponseDTO';
import { ListUsersRequestDTO } from '@/usecases/listUsers/dtos/ListUsersRequestDTO';

interface IListUsersUseCase {
  listUsers(data: ListUsersRequestDTO): Promise<IListAllUsersResponseDTO>;
}

export { IListUsersUseCase };
