import { Either } from '@/shared/logic/Either';

import { TokenInvalid } from '@/usecases/_helpers_/errors/TokenInvalid';
import { PasswordDoesNotMatch } from '@/usecases/_helpers_/errors/PasswordDoesNotMatch';

type ResetPasswordResponseDTO = Either<
  TokenInvalid | PasswordDoesNotMatch,
  boolean
>;

export { ResetPasswordResponseDTO };
