import { Either } from '@/shared/logic/Either';

import { UserPropsDTO } from '@/entities/user/dtos/UserPropsDTO';

import { InvalidEmailError } from '@/entities/user/errors/InvalidEmailError';
import { InvalidPasswordLengthError } from '@/entities/user/errors/InvalidPasswordLength';
import { InvalidNameError } from '@/entities/user/errors/InvalidNameError';
import { AccountAlreadyExistsError } from '@/usecases/_helpers_/errors/AccountAlreadyExists';

type CreatedUserResponseDTO = Either<
  | AccountAlreadyExistsError
  | InvalidEmailError
  | InvalidPasswordLengthError
  | InvalidNameError,
  UserPropsDTO
>;

export { CreatedUserResponseDTO };
