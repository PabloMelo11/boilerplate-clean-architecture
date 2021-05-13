import { Either } from '@/shared/logic/Either';

import { User } from '@/domain/entities/user/user';

import { InvalidEmailError } from '@/domain/entities/user/errors/InvalidEmailError';
import { InvalidPasswordLengthError } from '@/domain/entities/user/errors/InvalidPasswordLength';
import { InvalidNameError } from '@/domain/entities/user/errors/InvalidNameError';

type UserResponseDTO = Either<
  InvalidEmailError | InvalidPasswordLengthError | InvalidNameError,
  User
>;

export { UserResponseDTO };
