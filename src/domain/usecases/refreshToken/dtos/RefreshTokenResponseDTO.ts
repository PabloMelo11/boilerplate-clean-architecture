import { Either } from '@/shared/logic/Either';

import { RefreshTokenDoesNotExists } from '@/domain/usecases/_common_/errors/RefreshTokenDoesNotExists';

type ResponseDTO = {
  token: string;
  refresh_token: string;
};

type RefreshTokenResponseDTO = Either<RefreshTokenDoesNotExists, ResponseDTO>;

export { RefreshTokenResponseDTO, ResponseDTO };
