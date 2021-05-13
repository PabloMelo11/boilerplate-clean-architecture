import { Either } from '@/shared/logic/Either';

import { TokenDoesNotExists } from '@/domain/usecases/_helpers_/errors/TokenDoesNotExists';
import { PasswordDoesNotMatch } from '@/domain/usecases/_helpers_/errors/PasswordDoesNotMatch';
import { TokenExpired } from '@/domain/usecases/_helpers_/errors/TokenExpired';

type ResetPasswordResponseDTO = Either<
  PasswordDoesNotMatch | TokenDoesNotExists | TokenExpired,
  boolean
>;

export { ResetPasswordResponseDTO };
