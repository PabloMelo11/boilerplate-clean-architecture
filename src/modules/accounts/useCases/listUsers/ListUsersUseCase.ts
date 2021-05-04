import { right } from '@/shared/logic/Either';

import { IUsersRepository } from '@/modules/accounts/repositories/IUsersRepository';

import { IListAllUsersResponseDTO } from '@/modules/accounts/useCases/listUsers/dtos/IListUsersResponseDTO';
import { IListUsersRequestDTO } from '@/modules/accounts/useCases/listUsers/dtos/IListUsersRequestDTO';

class ListUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    except_current_user_id,
  }: IListUsersRequestDTO): Promise<IListAllUsersResponseDTO> {
    const findUsers = await this.usersRepository.listAllUsers(
      except_current_user_id,
    );

    return right(findUsers);
  }
}

export { ListUsersUseCase };
