import { Either } from '@/shared/logic/Either';

import { UserPropsDTO } from '@/domain/entities/user/dtos/UserPropsDTO';

type ListAllUsersResponseDTO = Either<Error, UserPropsDTO[]>;

export { ListAllUsersResponseDTO };
