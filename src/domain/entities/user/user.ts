import { right, left } from '@/shared/logic/Either';

import { UserPropsDTO } from '@/domain/entities/user/dtos/UserPropsDTO';
import { UserResponseDTO } from '@/domain/entities/user/dtos/UserResponseDTO';

import { Email } from './email';
import { Password } from './password';
import { Name } from './name';

class User {
  public readonly id: string;
  public readonly name: Name;
  public readonly email: Email;
  public readonly password: Password;
  public readonly driver_license: string;
  public readonly avatar: string;

  private constructor(props: User) {
    Object.assign(this, props);
    Object.freeze(this);
  }

  static create(props: UserPropsDTO, id?: string): UserResponseDTO {
    const nameOrError = Name.create(props.name);
    const emailOrError = Email.create(props.email);
    const passwordOrError = Password.create(props.password);

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    const name: Name = nameOrError.value;
    const email: Email = emailOrError.value;
    const password: Password = passwordOrError.value;

    const user = new User({
      id: props.id || id,
      name,
      email,
      password,
      driver_license: props.driver_license,
      avatar: props.avatar,
    });

    return right(user);
  }
}

export { User };
