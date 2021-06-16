import { Either } from '@/shared/logic/Either';

import { User } from '@/domain/entities/user/user';

import { InvalidEmailError } from '@/domain/entities/_common_/errors/InvalidEmailError';
import { InvalidPasswordLengthError } from '@/domain/entities/_common_/errors/InvalidPasswordLength';
import { InvalidNameError } from '@/domain/entities/_common_/errors/InvalidNameError';

type UserResponseDTO = Either<
  InvalidEmailError | InvalidPasswordLengthError | InvalidNameError,
  User
>;

export { UserResponseDTO };
