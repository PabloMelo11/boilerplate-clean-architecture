import { right } from '@/shared/logic/Either';

import { IUsersRepository } from '@/usecases/_helpers_/repositories/IUsersRepository';

import { IListAllUsersResponseDTO } from '@/usecases/listUsers/dtos/ListUsersResponseDTO';
import { ListUsersRequestDTO } from '@/usecases/listUsers/dtos/ListUsersRequestDTO';

import { IListUsersUseCase } from '@/usecases/listUsers/IListUsersUseCase';

class ListUsersUseCase implements IListUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    except_current_user_id,
  }: ListUsersRequestDTO): Promise<IListAllUsersResponseDTO> {
    const findUsers = await this.usersRepository.listAllUsers(
      except_current_user_id,
    );

    return right(findUsers);
  }
}

export { ListUsersUseCase };
