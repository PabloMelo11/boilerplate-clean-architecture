import { Either } from '@/shared/logic/Either';

import { User } from '@/entities/user/user';

import { InvalidEmailError } from '@/entities/user/errors/InvalidEmailError';
import { InvalidPasswordLengthError } from '@/entities/user/errors/InvalidPasswordLength';
import { InvalidNameError } from '@/entities/user/errors/InvalidNameError';

type IUserResponseDTO = Either<
  InvalidEmailError | InvalidPasswordLengthError | InvalidNameError,
  User
>;

export { IUserResponseDTO };
