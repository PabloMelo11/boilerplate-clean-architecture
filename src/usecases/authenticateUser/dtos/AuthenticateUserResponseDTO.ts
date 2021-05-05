import { Either } from '@/shared/logic/Either';

import { InvalidDateError } from '@/entities/userTokens/errors/InvalidDateError';
import { InvalidTypeError } from '@/entities/userTokens/errors/InvalidTypeError';
import { InvalidEmailOrPassword } from '@/usecases/_helpers_/errors/InvalidEmailOrPassword';

type ResponseDTO = {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
};

type AuthenticateUserResponseDTO = Either<
  InvalidDateError | InvalidTypeError | InvalidEmailOrPassword,
  ResponseDTO
>;

export { AuthenticateUserResponseDTO, ResponseDTO };
