import { Either } from '@/shared/logic/Either';

import { User } from '@/entities/user/user';

type IListAllUsersResponseDTO = Either<Error, User[]>;

export { IListAllUsersResponseDTO };
