import { right, left } from '@/shared/logic/Either';

import { UserTokenPropsDTO } from '@/domain/entities/userTokens/dtos/UserTokenPropsDTO';
import { UserTokenResponseDTO } from '@/domain/entities/userTokens/dtos/UserTokenResponseDTO';

import { Type } from '@/domain/entities/_common_/valuesObject/type';
import { ExpiresDate } from '@/domain/entities/_common_/valuesObject/expiresDate';

class UserTokens {
  public readonly id: string;
  public readonly token: string;
  public readonly type: Type;
  public readonly user_id: string;
  public readonly expires_date: ExpiresDate;

  private constructor(props: UserTokens) {
    Object.assign(this, props);
    Object.freeze(this);
  }

  static create(props: UserTokenPropsDTO, id?: string): UserTokenResponseDTO {
    const typeOrError = Type.create(props.type);
    const expiresDateOrError = ExpiresDate.create(props.expires_date);

    if (expiresDateOrError.isLeft()) {
      return left(expiresDateOrError.value);
    }

    if (typeOrError.isLeft()) {
      return left(typeOrError.value);
    }

    const type: Type = typeOrError.value;
    const expires_date: ExpiresDate = expiresDateOrError.value;

    const userToken = new UserTokens({
      id: props.id || id,
      token: props.token,
      user_id: props.user_id,
      type,
      expires_date,
    });

    return right(userToken);
  }
}

export { UserTokens };
