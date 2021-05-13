import { ListAllUsersResponseDTO } from '@/domain/usecases/listUsers/dtos/ListUsersResponseDTO';
import { ListUsersRequestDTO } from '@/domain/usecases/listUsers/dtos/ListUsersRequestDTO';

interface IListUsersUseCase {
  listUsers(data: ListUsersRequestDTO): Promise<ListAllUsersResponseDTO>;
}

export { IListUsersUseCase };
