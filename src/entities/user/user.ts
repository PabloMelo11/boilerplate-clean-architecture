import { Entity } from '@/shared/domain/Entity';
import { right, left } from '@/shared/logic/Either';

import { IUserPropsDTO } from '@/entities/user/dtos/IUserPropsDTO';
import { IUserResponseDTO } from '@/entities/user/dtos/IUserResponseDTO';

import { Email } from './email';
import { Password } from './password';
import { Name } from './name';

class User extends Entity<IUserPropsDTO> {
  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get driver_license(): string {
    return this.props.driver_license;
  }

  get avatar(): string {
    return this.props.avatar;
  }

  private constructor(props: IUserPropsDTO, id?: string) {
    super(props, id);
  }

  static create(props: IUserPropsDTO, id?: string): IUserResponseDTO {
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

    const userProps = {
      ...props,
      name: name.value,
      email: email.value,
      password: password.value,
    };

    const user = new User(userProps, id);

    return right(user);
  }
}

export { User };
