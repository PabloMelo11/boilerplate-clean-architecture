import { Password } from '@/domain/entities/_common_/valuesObject/password';

describe('User password value object', () => {
  it('should accept valid password', () => {
    const passwordOrError = Password.create('123456');

    expect(passwordOrError.isRight()).toBeTruthy();
  });

  it('should reject password with less than 6 characters', () => {
    const passwordOrError = Password.create('12345');

    expect(passwordOrError.isLeft()).toBeTruthy();
  });

  it('should reject password with more than 255 characters', () => {
    const passwordOrError = Password.create('1'.repeat(260));

    expect(passwordOrError.isLeft()).toBeTruthy();
  });
});
