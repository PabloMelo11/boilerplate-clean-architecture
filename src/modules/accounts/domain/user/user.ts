import { Entity } from '@/core/domain/Entity';
import { Either, right } from '@/core/logic/Either';

import { InvalidEmailError } from './errors/InvalidEmailError';

interface IUserProps {
  name: string;
  password: string;
  email: string;
  driver_license: string;

  id?: string;
  avatar?: string;
}

class User extends Entity<IUserProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get driver_license() {
    return this.props.driver_license;
  }

  get avatar() {
    return this.props.avatar;
  }

  private constructor(props: IUserProps, id?: string) {
    super(props, id);
  }

  static create(
    props: IUserProps,
    id?: string,
  ): Either<InvalidEmailError, User> {
    const user = new User(props, id);

    return right(user);
  }
}

export { User };
