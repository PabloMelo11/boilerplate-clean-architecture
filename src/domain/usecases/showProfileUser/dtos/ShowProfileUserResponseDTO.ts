import { Either } from '@/shared/logic/Either';

import { UserPropsDTO } from '@/domain/entities/user/dtos/UserPropsDTO';

import { AccountDoesNotExists } from '@/domain/usecases/_helpers_/errors/AccountDoesNotExists';

type ShowProfileUserResponseDTO = Either<AccountDoesNotExists, UserPropsDTO>;

export { ShowProfileUserResponseDTO };