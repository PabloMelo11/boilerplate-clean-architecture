import { right } from '@/shared/logic/Either';

import { IUsersRepository } from '@/usecases/_helpers_/repositories/IUsersRepository';

import { IListAllUsersResponseDTO } from '@/usecases/listUsers/dtos/IListUsersResponseDTO';
import { IListUsersRequestDTO } from '@/usecases/listUsers/dtos/IListUsersRequestDTO';

import { IListUsersUseCase } from '@/usecases/listUsers/IListUsersUseCase';

class ListUsersUseCase implements IListUsersUseCase {
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
