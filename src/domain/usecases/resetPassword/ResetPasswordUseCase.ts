import { left, right } from '@/shared/logic/Either';

import { Password } from '@/domain/entities/valuesObject/password';

import { IResetPasswordUseCase } from '@/domain/usecases/resetPassword/IResetPasswordUseCase';

import { IUsersRepository } from '@/domain/usecases/_helpers_/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@/domain/usecases/_helpers_/repositories/IUsersTokensRepository';

import { IDateProvider } from '@/domain/usecases/_helpers_/providers/IDateProvider';
import { IHashProvider } from '@/domain/usecases/_helpers_/providers/IHashProvider';

import { ResetPasswordRequestDTO } from '@/domain/usecases/resetPassword/dtos/ResetPasswordRequestDTO';
import { ResetPasswordResponseDTO } from '@/domain/usecases/resetPassword/dtos/ResetPasswordResponseDTO';

import { TokenDoesNotExists } from '@/domain/usecases/_helpers_/errors/TokenDoesNotExists';
import { TokenExpired } from '@/domain/usecases/_helpers_/errors/TokenExpired';
import { PasswordDoesNotMatch } from '@/domain/usecases/_helpers_/errors/PasswordDoesNotMatch';

class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private usersTokensRepository: IUsersTokensRepository,
    private dateProvider: IDateProvider,
    private hashProvider: IHashProvider,
  ) {}

  async resetPassword({
    password,
    token,
  }: Omit<
    ResetPasswordRequestDTO,
    'password_confirmation'
  >): Promise<ResetPasswordResponseDTO> {
    const passwordOrError = Password.create(password);

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    const _password = passwordOrError.value;

    const user_token = await this.usersTokensRepository.findByToken(token);

    if (!user_token) {
      return left(new TokenDoesNotExists());
    }

    const date_now = this.dateProvider.dateNow();

    const compare_day = this.dateProvider.compareInDays({
      start_date: date_now,
      end_date: user_token.expires_date.value,
    });

    if (compare_day >= 1) {
      return left(new TokenExpired());
    }

    const compare_hour = this.dateProvider.compareInHours({
      start_date: date_now,
      end_date: user_token.expires_date.value,
    });

    if (compare_hour > 3) {
      return left(new TokenExpired());
    }

    const user = await this.usersRepository.findById(user_token.user_id);

    const passwordHash = await this.hashProvider.generateHash(_password.value);

    user.password = passwordHash;

    await this.usersRepository.update(user);

    await this.usersTokensRepository.deleteById(user_token.id);

    return right(true);
  }
}

export { ResetPasswordUseCase };
