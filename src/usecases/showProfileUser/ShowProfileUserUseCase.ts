import { left, right } from '@/shared/logic/Either';

import { IShowProfileUserUseCase } from '@/usecases/showProfileUser/IShowProfileUserUseCase';

import { IUsersRepository } from '@/usecases/_helpers_/repositories/IUsersRepository';

import { ShowProfileUserDTO } from '@/usecases/showProfileUser/dtos/ShowProfileUserDTO';
import { ShowProfileUserRequestDTO } from '@/usecases/showProfileUser/dtos/ShowProfileUserRequestDTO';

import { AccountDoesNotExists } from '@/usecases/_helpers_/errors/AccountDoesNotExists';

class ShowProfileUserUseCase implements IShowProfileUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async loadProfile({
    user_id,
  }: ShowProfileUserRequestDTO): Promise<ShowProfileUserDTO> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      return left(new AccountDoesNotExists());
    }

    return right(user);
  }
}

export { ShowProfileUserUseCase };
