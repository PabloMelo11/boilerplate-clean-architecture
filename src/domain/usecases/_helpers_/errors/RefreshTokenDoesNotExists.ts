import { UseCaseError } from '@/shared/domain/errors/UseCaseError';

class RefreshTokenDoesNotExists extends Error implements UseCaseError {
  constructor() {
    super(`The refresh token does not exists.`);
    this.name = 'RefreshTokenDoesNotExists';
  }
}

export { RefreshTokenDoesNotExists };
