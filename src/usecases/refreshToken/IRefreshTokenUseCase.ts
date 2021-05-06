import { RefreshTokenDoesNotExists } from '@/usecases/_helpers_/errors/RefreshTokenDoesNotExists';

interface IRefreshTokenUseCase {
  createRefreshToken(refresh_token: string): Promise<RefreshTokenDoesNotExists>;
}

export { IRefreshTokenUseCase };
