import { Either, right } from '@/core/logic/Either';

import { IUsersRepository } from '@/infra/repositories/accounts/IUsersRepository';

import { User } from '@/modules/accounts/domain/user/user';

type IListAllUsers = Either<Error, User[]>;

type IRequestDTO = {
  except_current_user_id: string;
};

class ListUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    except_current_user_id,
  }: IRequestDTO): Promise<IListAllUsers> {
    const findUsers = await this.usersRepository.listAllUsers(
      except_current_user_id,
    );

    return right(findUsers);
  }
}

export { ListUsersUseCase };
