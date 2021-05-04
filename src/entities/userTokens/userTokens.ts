import { Entity } from '@/shared/domain/Entity';
import { right, left } from '@/shared/logic/Either';

import { UserTokenPropsDTO } from '@/entities/userTokens/dtos/UserTokenPropsDTO';

import { Type } from '@/entities/userTokens/type';
import { ExpiresDate } from '@/entities/userTokens/expiresDate';

class UserTokens extends Entity<UserTokenPropsDTO> {
  get token() {
    return this.props.token;
  }

  get type() {
    return this.props.type;
  }

  get user_id() {
    return this.props.user_id;
  }

  get expires_date() {
    return this.props.expires_date;
  }

  private constructor(props: UserTokenPropsDTO, id?: string) {
    super(props, id);
  }

  static create(props: UserTokenPropsDTO, id?: string): any {
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

    const userTokenProps = {
      ...props,
      type: type.value,
      expires_date: expires_date.value,
    };

    const userToken = new UserTokens(userTokenProps);

    return right(userToken);
  }
}

export { UserTokens };
