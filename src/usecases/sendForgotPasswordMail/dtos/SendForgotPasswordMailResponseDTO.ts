import { Either } from '@/shared/logic/Either';

import { AccountDoesNotExists } from '@/usecases/_helpers_/errors/AccountDoesNotExists';

type SendForgotPasswordMailResponseDTO = Either<AccountDoesNotExists, boolean>;

export { SendForgotPasswordMailResponseDTO };
