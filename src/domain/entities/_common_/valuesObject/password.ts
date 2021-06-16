import { Either, left, right } from '@/shared/logic/Either';

import { InvalidPasswordLengthError } from '@/domain/entities/_common_/errors/InvalidPasswordLength';

class Password {
  private readonly password: string;

  constructor(password: string) {
    this.password = password;
    Object.freeze(this);
  }

  get value(): string {
    return this.password;
  }

  static validate(password: string): boolean {
    if (!password || password.length < 6 || password.length > 255) {
      return false;
    }

    return true;
  }

  static create(
    password: string,
  ): Either<InvalidPasswordLengthError, Password> {
    if (!this.validate(password)) {
      return left(new InvalidPasswordLengthError());
    }

    return right(new Password(password));
  }
}

export { Password };
