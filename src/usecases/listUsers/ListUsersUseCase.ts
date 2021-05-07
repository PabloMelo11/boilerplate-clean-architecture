import { right } from '@/shared/logic/Either';

import { IUsersRepository } from '@/usecases/_helpers_/repositories/IUsersRepository';
import { IListUsersUseCase } from '@/usecases/listUsers/IListUsersUseCase';

import { ListAllUsersResponseDTO } from '@/usecases/listUsers/dtos/ListUsersResponseDTO';
import { ListUsersRequestDTO } from '@/usecases/listUsers/dtos/ListUsersRequestDTO';

class ListUsersUseCase implements IListUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async listUsers({
    except_current_user_id,
  }: ListUsersRequestDTO): Promise<ListAllUsersResponseDTO> {
    const all_users = await this.usersRepository.listAllUsers(
      except_current_user_id,
    );

    return right(all_users);
  }
}

export { ListUsersUseCase };
