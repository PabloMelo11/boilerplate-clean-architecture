import { right, left } from '@/shared/logic/Either';

import { UserPropsDTO } from '@/entities/user/dtos/UserPropsDTO';
import { UserResponseDTO } from '@/entities/user/dtos/UserResponseDTO';

import { Email } from './email';
import { Password } from './password';
import { Name } from './name';

type CreateUserPropsDTO = {
  name: Name;
  email: Email;
  password: Password;
  driver_license: string;

  id?: string;
  avatar?: string;
};

class User {
  public readonly id: string;
  public readonly name: Name;
  public readonly email: Email;
  public readonly password: Password;
  public readonly driver_license: string;
  public readonly avatar: string;

  private constructor(props: CreateUserPropsDTO) {
    Object.assign(this, props);
    Object.freeze(this);
  }

  static create(props: UserPropsDTO): UserResponseDTO {
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
