import { Either } from '@/shared/logic/Either';

import { User } from '@/entities/user/user';

type ListAllUsersResponseDTO = Either<Error, User[]>;

export { ListAllUsersResponseDTO };
