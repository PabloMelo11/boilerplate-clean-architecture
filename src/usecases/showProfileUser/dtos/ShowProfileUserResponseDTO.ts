import { Either } from '@/shared/logic/Either';

import { UserPropsDTO } from '@/entities/user/dtos/UserPropsDTO';

import { AccountDoesNotExists } from '@/usecases/_helpers_/errors/AccountDoesNotExists';

type ShowProfileUserResponseDTO = Either<AccountDoesNotExists, UserPropsDTO>;

export { ShowProfileUserResponseDTO };
