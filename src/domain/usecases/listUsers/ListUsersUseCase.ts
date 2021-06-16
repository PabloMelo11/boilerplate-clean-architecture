import { right } from '@/shared/logic/Either';

import { IUsersRepository } from '@/domain/usecases/_common_/repositories/IUsersRepository';
import { IListUsersUseCase } from '@/domain/usecases/listUsers/IListUsersUseCase';

import { ListAllUsersResponseDTO } from '@/domain/usecases/listUsers/dtos/ListUsersResponseDTO';
import { ListUsersRequestDTO } from '@/domain/usecases/listUsers/dtos/ListUsersRequestDTO';

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
