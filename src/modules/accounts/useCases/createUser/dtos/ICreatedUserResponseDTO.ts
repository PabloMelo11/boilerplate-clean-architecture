import { Either } from '@/shared/logic/Either';

import { User } from '@/entities/user/user';

import { InvalidEmailError } from '@/entities/user/errors/InvalidEmailError';
import { InvalidPasswordLengthError } from '@/entities/user/errors/InvalidPasswordLength';
import { InvalidNameError } from '@/entities/user/errors/InvalidNameError';
import { AccountAlreadyExistsError } from '@/modules/accounts/useCases/errors/AccountAlreadyExists';

type ICreatedUserResponseDTO = Either<
  | AccountAlreadyExistsError
  | InvalidEmailError
  | InvalidPasswordLengthError
  | InvalidNameError,
  User
>;

export { ICreatedUserResponseDTO };
