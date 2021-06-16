import { UseCaseError } from '@/shared/domain/errors/UseCaseError';

class TokenInvalid extends Error implements UseCaseError {
  constructor() {
    super(`The token is invalid.`);
    this.name = 'TokenInvalid';
  }
}

export { TokenInvalid };
