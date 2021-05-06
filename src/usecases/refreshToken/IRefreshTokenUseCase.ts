import { RefreshTokenResponseDTO } from '@/usecases/refreshToken/dtos/RefreshTokenResponseDTO';
import { RefreshTokenRequestDTO } from '@/usecases/refreshToken/dtos/RefreshTokenRequestDTO';

interface IRefreshTokenUseCase {
  createNewRefreshToken(
    data: RefreshTokenRequestDTO,
  ): Promise<RefreshTokenResponseDTO>;
}

export { IRefreshTokenUseCase };
