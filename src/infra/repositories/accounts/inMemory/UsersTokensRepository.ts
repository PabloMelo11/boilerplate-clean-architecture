import { UserTokens } from '@/entities/userTokens/userTokens';

import { IUsersTokensRepository } from '@/modules/accounts/repositories/IUsersTokensRepository';

import { FindTokenByUserAndRefreshTokenDTO } from '@/modules/accounts/useCases/authenticateUser/dtos/FindTokenByUserAndRefreshTokenDTO';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private static usersTokens: UserTokens[] = [];

  public async create(data: UserTokens): Promise<UserTokens> {
    UsersTokensRepositoryInMemory.usersTokens.push(data);

    return data;
  }

  public async findByUserIdAndRefreshToken({
    refresh_token,
    user_id,
  }: FindTokenByUserAndRefreshTokenDTO): Promise<UserTokens> {
    const userToken = UsersTokensRepositoryInMemory.usersTokens.find(
      userToken =>
        userToken.user_id === user_id && userToken.token === refresh_token,
    );

    return userToken;
  }

  public async deleteById(token_id: string): Promise<void> {
    const userTokenIndex = UsersTokensRepositoryInMemory.usersTokens.findIndex(
      userToken => userToken.id === token_id,
    );

    UsersTokensRepositoryInMemory.usersTokens.splice(userTokenIndex, 1);
  }

  public async findByToken(token: string): Promise<UserTokens> {
    const userToken = UsersTokensRepositoryInMemory.usersTokens.find(
      userToken => userToken.token === token,
    );

    return userToken;
  }
}

export { UsersTokensRepositoryInMemory };