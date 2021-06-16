import { ExpiresDate } from '@/domain/entities/_common_/valuesObject/expiresDate';

describe('User tokens expires date value object', () => {
  it('should accept valid expires date value object', () => {
    const expiresDateOrError = ExpiresDate.create(new Date());

    expect(expiresDateOrError.isRight()).toBeTruthy();
  });

  it('should reject expires date when send hours before now', () => {
    const dateNow = new Date();

    const newDateSub2Hours = dateNow.setHours(dateNow.getHours() - 2);

    const expiresDateOrError = ExpiresDate.create(new Date(newDateSub2Hours));

    expect(expiresDateOrError.isLeft()).toBeTruthy();
  });

  it('should reject expires date when not send parameter', () => {
    const expiresDateOrError = ExpiresDate.create(null);

    expect(expiresDateOrError.isLeft()).toBeTruthy();
  });
});
