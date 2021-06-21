import { Either } from '@/shared/logic/Either';

import { UserPropsDTO } from '@/domain/entities/user/dtos/UserPropsDTO';

import { InvalidEmailError } from '@/domain/entities/_common_/errors/InvalidEmailError';
import { InvalidPasswordLengthError } from '@/domain/entities/_common_/errors/InvalidPasswordLength';
import { InvalidNameError } from '@/domain/entities/_common_/errors/InvalidNameError';
import { AccountAlreadyExistsError } from '@/domain/usecases/_common_/errors/AccountAlreadyExists';

type CreatedUserResponseDTO = Either<
  | AccountAlreadyExistsError
  | InvalidEmailError
  | InvalidPasswordLengthError
  | InvalidNameError,
  UserPropsDTO
>;

export { CreatedUserResponseDTO };
