import { left, right } from '@/shared/logic/Either';

import { IUsersRepository } from '@/usecases/_helpers_/repositories/IUsersRepository';
import { IShowProfileUserUseCase } from '@/usecases/showProfileUser/IShowProfileUserUseCase';
import { ShowProfileUserDTO } from '@/usecases/showProfileUser/dtos/ShowProfileUserDTO';
import { AccountDoesNotExists } from '@/usecases/_helpers_/errors/AccountDoesNotExists';

class ShowProfileUserUseCase implements IShowProfileUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async loadProfile(user_id: string): Promise<ShowProfileUserDTO> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      return left(new AccountDoesNotExists());
    }

    return right(user);
  }
}

export { ShowProfileUserUseCase };
