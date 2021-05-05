import { Either, left, right } from '@/shared/logic/Either';

import { InvalidTypeError } from '@/entities/userTokens/errors/InvalidTypeError';

class Type {
  private readonly type: string;

  get value(): string {
    return this.type;
  }

  private constructor(type: string) {
    this.type = type;
  }

  static validate(type: string): boolean {
    if (
      !type ||
      (type.trim() !== 'refresh_token' && type.trim() !== 'forgot_password')
    ) {
      return false;
    }

    return true;
  }

  static create(type: string): Either<InvalidTypeError, Type> {
    if (!this.validate(type)) {
      return left(new InvalidTypeError(type));
    }

    return right(new Type(type));
  }
}

export { Type };
