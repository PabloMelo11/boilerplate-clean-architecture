import { Either } from '@/shared/logic/Either';

import { AccountDoesNotExists } from '@/usecases/_helpers_/errors/AccountDoesNotExists';

type UpdateAvatarUserResponseDTO = Either<AccountDoesNotExists, void>;

export { UpdateAvatarUserResponseDTO };
