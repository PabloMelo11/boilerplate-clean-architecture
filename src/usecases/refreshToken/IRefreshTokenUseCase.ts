import { RefreshTokenResponseDTO } from '@/usecases/refreshToken/dtos/RefreshTokenResponseDTO';

interface IRefreshTokenUseCase {
  createNewRefreshToken(
    refresh_token: string,
  ): Promise<RefreshTokenResponseDTO>;
}

export { IRefreshTokenUseCase };
