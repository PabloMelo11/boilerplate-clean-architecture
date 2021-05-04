import { Either } from '@/shared/logic/Either';

import { UserTokens } from '@/entities/userTokens/userTokens';

import { InvalidDateError } from '@/entities/userTokens/errors/InvalidDateError';
import { InvalidTypeError } from '@/entities/userTokens/errors/InvalidTypeError';
import { InvalidEmailOrPasswordError } from '@/modules/accounts/useCases/errors/InvalidEmailOrPasswordError';

type AuthenticateUserResponseDTO = Either<
  InvalidDateError | InvalidTypeError | InvalidEmailOrPasswordError,
  UserTokens
>;

export { AuthenticateUserResponseDTO };
