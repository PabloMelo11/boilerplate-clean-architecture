import { Email } from '@/domain/entities/user/email';

describe('test', () => {
  it('should accept valid email address', () => {
    const emailOrError = Email.create('johndoe@example.com');

    expect(emailOrError.isRight()).toBeTruthy();
  });
});
