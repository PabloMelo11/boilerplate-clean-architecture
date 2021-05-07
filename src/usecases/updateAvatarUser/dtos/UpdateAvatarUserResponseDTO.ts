import { Either } from '@/shared/logic/Either';

import { UserPropsDTO } from '@/entities/user/dtos/UserPropsDTO';

import { AccountDoesNotExists } from '@/usecases/_helpers_/errors/AccountDoesNotExists';

type UpdateAvatarUserResponseDTO = Either<AccountDoesNotExists, UserPropsDTO>;

export { UpdateAvatarUserResponseDTO };
