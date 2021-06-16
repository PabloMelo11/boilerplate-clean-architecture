import { Either } from '@/shared/logic/Either';

import { UserPropsDTO } from '@/domain/entities/user/dtos/UserPropsDTO';

import { AccountDoesNotExists } from '@/domain/usecases/_common_/errors/AccountDoesNotExists';

type UpdateAvatarUserResponseDTO = Either<AccountDoesNotExists, UserPropsDTO>;

export { UpdateAvatarUserResponseDTO };
