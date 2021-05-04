import { Either } from '@/shared/logic/Either';

import { UserTokens } from '@/entities/userTokens/userTokens';

import { InvalidDateError } from '@/entities/userTokens/errors/InvalidDateError';
import { InvalidTypeError } from '@/entities/userTokens/errors/InvalidTypeError';

type UserTokenResponseDTO = Either<
  InvalidDateError | InvalidTypeError,
  UserTokens
>;

export { UserTokenResponseDTO };
