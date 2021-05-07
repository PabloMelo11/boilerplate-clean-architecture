import { left, right } from '@/shared/logic/Either';

import { IResetPasswordUseCase } from '@/usecases/resetPassword/IResetPasswordUseCase';

import { IUsersRepository } from '@/usecases/_helpers_/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@/usecases/_helpers_/repositories/IUsersTokensRepository';

import { IDateProvider } from '@/usecases/_helpers_/providers/IDateProvider';
import { IHashProvider } from '@/usecases/_helpers_/providers/IHashProvider';

import { ResetPasswordRequestDTO } from '@/usecases/resetPassword/dtos/ResetPasswordRequestDTO';
import { ResetPasswordResponseDTO } from '@/usecases/resetPassword/dtos/ResetPasswordResponseDTO';

import { TokenDoesNotExists } from '@/usecases/_helpers_/errors/TokenDoesNotExists';
import { TokenExpired } from '@/usecases/_helpers_/errors/TokenExpired';
import { PasswordDoesNotMatch } from '@/usecases/_helpers_/errors/PasswordDoesNotMatch';

class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private usersTokensRepository: IUsersTokensRepository,
    private dateProvider: IDateProvider,
    private hashProvider: IHashProvider,
  ) {}

  async resetPassword({
    password,
    password_confirmation,
    token,
  }: ResetPasswordRequestDTO): Promise<ResetPasswordResponseDTO> {
    if (password !== password_confirmation) {
      return left(new PasswordDoesNotMatch());
    }

    const user_token = await this.usersTokensRepository.findByToken(token);

    if (!user_token) {
      return left(new TokenDoesNotExists());
    }

    const date_now = this.dateProvider.dateNow();

    const compare_day = this.dateProvider.compareInDays({
      start_date: date_now,
      end_date: user_token.expires_date,
    });

    if (compare_day >= 1) {
      return left(new TokenExpired());
    }

    const compare_hour = this.dateProvider.compareInHours({
      start_date: date_now,
      end_date: user_token.expires_date,
    });

    if (compare_hour > 3) {
      return left(new TokenExpired());
    }

    const user = await this.usersRepository.findById(user_token.user_id);

    const passwordHash = await this.hashProvider.generateHash(password);

    user.props.password = passwordHash;

    await this.usersRepository.update(user);

    await this.usersTokensRepository.deleteById(user_token.id);

    return right(true);
  }
}

export { ResetPasswordUseCase };
