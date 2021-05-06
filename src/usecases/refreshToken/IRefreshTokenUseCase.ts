import { RefreshTokenResponseDTO } from '@/usecases/refreshToken/dtos/RefreshTokenResponseDTO';

interface IRefreshTokenUseCase {
  createRefreshToken(refresh_token: string): Promise<RefreshTokenResponseDTO>;
}

export { IRefreshTokenUseCase };
