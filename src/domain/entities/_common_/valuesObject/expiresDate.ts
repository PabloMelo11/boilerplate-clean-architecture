import { Either, left, right } from '@/shared/logic/Either';

import { InvalidDateError } from '@/domain/entities/_common_/errors/InvalidDateError';

class ExpiresDate {
  private readonly expires_date: Date;

  get value(): Date {
    return this.expires_date;
  }

  private constructor(expires_date: Date) {
    this.expires_date = expires_date;
  }

  static validate(expires_date: Date): boolean {
    const previousDate = expires_date < new Date();

    console.log(expires_date);
    console.log(new Date());

    if (!expires_date || previousDate) {
      return false;
    }

    return true;
  }

  static create(expires_date: Date): Either<InvalidDateError, ExpiresDate> {
    if (!this.validate(expires_date)) {
      return left(new InvalidDateError(expires_date));
    }

    return right(new ExpiresDate(expires_date));
  }
}

export { ExpiresDate };
