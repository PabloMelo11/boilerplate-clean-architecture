import { RefreshTokenResponseDTO } from '@/domain/usecases/refreshToken/dtos/RefreshTokenResponseDTO';
import { RefreshTokenRequestDTO } from '@/domain/usecases/refreshToken/dtos/RefreshTokenRequestDTO';

interface IRefreshTokenUseCase {
  createNewRefreshToken(
    data: RefreshTokenRequestDTO,
  ): Promise<RefreshTokenResponseDTO>;
}

export { IRefreshTokenUseCase };
