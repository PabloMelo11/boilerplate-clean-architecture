import { Either } from '@/shared/logic/Either';

import { TokenDoesNotExists } from '@/usecases/_helpers_/errors/TokenDoesNotExists';
import { PasswordDoesNotMatch } from '@/usecases/_helpers_/errors/PasswordDoesNotMatch';
import { TokenExpired } from '@/usecases/_helpers_/errors/TokenExpired';

type ResetPasswordResponseDTO = Either<
  PasswordDoesNotMatch | TokenDoesNotExists | TokenExpired,
  boolean
>;

export { ResetPasswordResponseDTO };
