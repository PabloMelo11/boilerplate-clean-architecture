import { Either } from '@/shared/logic/Either';

import { UserPropsDTO } from '@/domain/entities/user/dtos/UserPropsDTO';

import { InvalidEmailError } from '@/domain/entities/user/errors/InvalidEmailError';
import { InvalidPasswordLengthError } from '@/domain/entities/user/errors/InvalidPasswordLength';
import { InvalidNameError } from '@/domain/entities/user/errors/InvalidNameError';
import { AccountAlreadyExistsError } from '@/domain/usecases/_helpers_/errors/AccountAlreadyExists';

type CreatedUserResponseDTO = Either<
  | AccountAlreadyExistsError
  | InvalidEmailError
  | InvalidPasswordLengthError
  | InvalidNameError,
  UserPropsDTO
>;

export { CreatedUserResponseDTO };
