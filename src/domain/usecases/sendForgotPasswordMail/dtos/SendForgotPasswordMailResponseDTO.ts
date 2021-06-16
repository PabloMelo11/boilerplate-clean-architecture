import { Either } from '@/shared/logic/Either';

import { AccountDoesNotExists } from '@/domain/usecases/_common_/errors/AccountDoesNotExists';

type SendForgotPasswordMailResponseDTO = Either<AccountDoesNotExists, boolean>;

export { SendForgotPasswordMailResponseDTO };
