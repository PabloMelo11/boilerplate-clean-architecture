import { Either } from '@/shared/logic/Either';

import { User } from '@/entities/user/user';

import { InvalidEmailError } from '@/entities/user/errors/InvalidEmailError';
import { InvalidPasswordLengthError } from '@/entities/user/errors/InvalidPasswordLength';
import { AccountAlreadyExistsError } from '@/modules/accounts/useCases/createUser/errors/AccountAlreadyExists';

type ICreatedUserResponseDTO = Either<
  AccountAlreadyExistsError | InvalidEmailError | InvalidPasswordLengthError,
  User
>;

export { ICreatedUserResponseDTO };
