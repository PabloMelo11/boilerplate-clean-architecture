import { UserTokenPropsDTO } from '@/domain/entities/userTokens/dtos/UserTokenPropsDTO';
import { FindTokenByUserAndRefreshTokenDTO } from '@/domain/usecases/authenticateUser/dtos/FindTokenByUserAndRefreshTokenDTO';

interface IUsersTokensRepository {
  create(data: UserTokenPropsDTO): Promise<UserTokenPropsDTO>;

  findByUserIdAndRefreshToken(
    data: FindTokenByUserAndRefreshTokenDTO,
  ): Promise<UserTokenPropsDTO>;

  deleteById(token_id: string): Promise<void>;

  findByToken(token: string): Promise<UserTokenPropsDTO>;
}

export { IUsersTokensRepository };
