import { Either } from '@/shared/logic/Either';

import { InvalidDateError } from '@/entities/userTokens/errors/InvalidDateError';
import { InvalidTypeError } from '@/entities/userTokens/errors/InvalidTypeError';
import { InvalidEmailOrPasswordError } from '@/usecases/_helpers_/errors/InvalidEmailOrPasswordError';

type ResponseDTO = {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
};

type AuthenticateUserResponseDTO = Either<
  InvalidDateError | InvalidTypeError | InvalidEmailOrPasswordError,
  ResponseDTO
>;

export { AuthenticateUserResponseDTO, ResponseDTO };
