import { left, right } from '@/shared/logic/Either';

import auth from '@/shared/config/auth';

import { UserTokens } from '@/domain/entities/userTokens/userTokens';

import { IRefreshTokenUseCase } from './IRefreshTokenUseCase';

import { IUsersTokensRepository } from '@/domain/usecases/_helpers_/repositories/IUsersTokensRepository';

import { ITokenProvider } from '@/domain/usecases/_helpers_/providers/ITokenProvider';
import { IDateProvider } from '@/domain/usecases/_helpers_/providers/IDateProvider';
import { IUUIDProvider } from '@/domain/usecases/_helpers_/providers/IUUIDProvider';

import {
  RefreshTokenResponseDTO,
  ResponseDTO,
} from '@/domain/usecases/refreshToken/dtos/RefreshTokenResponseDTO';

import { PayloadVerifyTokenDTO } from '@/domain/usecases/refreshToken/dtos/PayloadVerifyTokenDTO';
import { RefreshTokenRequestDTO } from '@/domain/usecases/refreshToken/dtos/RefreshTokenRequestDTO';

import { RefreshTokenDoesNotExists } from '@/domain/usecases/_helpers_/errors/RefreshTokenDoesNotExists';

class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(
    private usersTokensRepository: IUsersTokensRepository,
    private tokenProvider: ITokenProvider,
    private dateProvider: IDateProvider,
    private uuidProvider: IUUIDProvider,
  ) {}

  async createNewRefreshToken({
    refresh_token,
  }: RefreshTokenRequestDTO): Promise<RefreshTokenResponseDTO> {
    const {
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
      secret_token,
      expires_in_token,
    } = auth;

    const { email, sub } = this.tokenProvider.verifyToken({
      token: refresh_token,
      secret: secret_refresh_token,
    }) as PayloadVerifyTokenDTO;

    const user_id = sub;

    const user_token = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      { user_id, refresh_token },
    );

    if (!user_token) {
      return left(new RefreshTokenDoesNotExists());
    }

    await this.usersTokensRepository.deleteById(user_token.id);

    const new_refresh_token = this.tokenProvider.generateToken({
      secret: secret_refresh_token,
      payload: { email },
      subject: user_id,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days,
    );

    const id = this.uuidProvider.generateUUID();
    const userTokenOrError = UserTokens.create(
      {
        user_id,
        token: refresh_token,
        expires_date: refresh_token_expires_date,
        type: 'refresh_token',
      },
      id,
    );

    if (userTokenOrError.isLeft()) {
      return left(userTokenOrError.value);
    }

    const userToken: UserTokens = userTokenOrError.value;

    await this.usersTokensRepository.create({
      id: userToken.id,
      type: userToken.type,
      expires_date: userToken.expires_date,
      token: userToken.token,
      user_id: userToken.user_id,
    });

    const token = this.tokenProvider.generateToken({
      secret: secret_token,
      subject: user_id,
      expiresIn: expires_in_token,
    });

    const returnToken: ResponseDTO = {
      token,
      refresh_token: new_refresh_token,
    };

    return right(returnToken);
  }
}

export { RefreshTokenUseCase };
