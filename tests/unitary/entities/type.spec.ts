import { Type } from '@/domain/entities/_common_/valuesObject/type';

describe('User Tokens type value objects', () => {
  it('should accept valid type (forgot_password)', () => {
    const typeOrError = Type.create('forgot_password');

    expect(typeOrError.isRight()).toBeTruthy();
  });

  it('should accept valid type (refresh_token)', () => {
    const typeOrError = Type.create('refresh_token');

    expect(typeOrError.isRight()).toBeTruthy();
  });

  it('should reject type when send parameter wrong', () => {
    const typeOrError = Type.create('error_type');

    expect(typeOrError.isLeft()).toBeTruthy();
  });

  it('should reject type when not send parameter', () => {
    const emailOrError = Type.create(null);

    expect(emailOrError.isLeft()).toBeTruthy();
  });
});
