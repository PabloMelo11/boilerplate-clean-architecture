import { left, right } from '@/shared/logic/Either';

import { IShowProfileUserUseCase } from '@/domain/usecases/showProfileUser/IShowProfileUserUseCase';

import { IUsersRepository } from '@/domain/usecases/_helpers_/repositories/IUsersRepository';

import { ShowProfileUserResponseDTO } from '@/domain/usecases/showProfileUser/dtos/ShowProfileUserResponseDTO';
import { ShowProfileUserRequestDTO } from '@/domain/usecases/showProfileUser/dtos/ShowProfileUserRequestDTO';

import { AccountDoesNotExists } from '@/domain/usecases/_helpers_/errors/AccountDoesNotExists';

class ShowProfileUserUseCase implements IShowProfileUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async loadProfile({
    user_id,
  }: ShowProfileUserRequestDTO): Promise<ShowProfileUserResponseDTO> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      return left(new AccountDoesNotExists());
    }

    return right(user);
  }
}

export { ShowProfileUserUseCase };
