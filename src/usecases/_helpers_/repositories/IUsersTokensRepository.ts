import { UserTokens } from '@/entities/userTokens/userTokens';

import { FindTokenByUserAndRefreshTokenDTO } from '@/usecases/authenticateUser/dtos/FindTokenByUserAndRefreshTokenDTO';

interface IUsersTokensRepository {
  create(data: UserTokens): Promise<UserTokens>;

  findByUserIdAndRefreshToken(
    data: FindTokenByUserAndRefreshTokenDTO,
  ): Promise<UserTokens>;

  deleteById(token_id: string): Promise<void>;

  findByToken(token: string): Promise<UserTokens>;
}

export { IUsersTokensRepository };
