import { Either } from '@/shared/logic/Either';

import { UserTokens } from '@/domain/entities/userTokens/userTokens';

import { InvalidDateError } from '@/domain/entities/_common_/errors/InvalidDateError';
import { InvalidTypeError } from '@/domain/entities/_common_/errors/InvalidTypeError';

type UserTokenResponseDTO = Either<
  InvalidDateError | InvalidTypeError,
  UserTokens
>;

export { UserTokenResponseDTO };
