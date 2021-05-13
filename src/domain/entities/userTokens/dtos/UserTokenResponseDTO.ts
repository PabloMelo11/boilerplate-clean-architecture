import { Either } from '@/shared/logic/Either';

import { UserTokens } from '@/domain/entities/userTokens/userTokens';

import { InvalidDateError } from '@/domain/entities/userTokens/errors/InvalidDateError';
import { InvalidTypeError } from '@/domain/entities/userTokens/errors/InvalidTypeError';

type UserTokenResponseDTO = Either<
  InvalidDateError | InvalidTypeError,
  UserTokens
>;

export { UserTokenResponseDTO };
