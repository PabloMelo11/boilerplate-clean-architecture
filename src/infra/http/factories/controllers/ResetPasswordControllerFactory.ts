import { makeResetPasswordValidationFactory } from '@/infra/http/factories/validations/ResetPasswordValidationFactory';

import { UsersRepositoryInMemory } from '@/infra/repositories/inMemory/UsersRepository';
import { UsersTokensRepositoryInMemory } from '@/infra/repositories/inMemory/UsersTokensRepository';

import { DateProviderDayjs } from '@/infra/providers/DateProvider/dayjs/DateProvider';
import { HashProviderBCrypt } from '@/infra/providers/HashProvider/bcrypt/HashProvider';

import { ResetPasswordUseCase } from '@/usecases/resetPassword/ResetPasswordUseCase';

import { ResetPasswordController } from '@/adapters/presentation/controllers/ResetPasswordController';

function makeResetPasswordControllerFactory() {
  const usersRepositoryInMemory = new UsersRepositoryInMemory();
  const usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

  const dateProviderDayjs = new DateProviderDayjs();
  const hashProviderBCrypt = new HashProviderBCrypt();

  const resetPasswordUseCase = new ResetPasswordUseCase(
    usersRepositoryInMemory,
    usersTokensRepositoryInMemory,
    dateProviderDayjs,
    hashProviderBCrypt,
  );

  const resetPasswordController = new ResetPasswordController(
    makeResetPasswordValidationFactory(),
    resetPasswordUseCase,
  );

  return resetPasswordController;
}

export { makeResetPasswordControllerFactory };
