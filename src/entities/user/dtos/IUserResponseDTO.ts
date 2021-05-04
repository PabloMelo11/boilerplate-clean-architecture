import { Either } from '@/shared/logic/Either';

import { User } from '@/entities/user/user';

import { InvalidEmailError } from '@/entities/user/errors/InvalidEmailError';
import { InvalidPasswordLengthError } from '@/entities/user/errors/InvalidPasswordLength';

type IUserResponseDTO = Either<
  InvalidEmailError | InvalidPasswordLengthError,
  User
>;

export { IUserResponseDTO };
