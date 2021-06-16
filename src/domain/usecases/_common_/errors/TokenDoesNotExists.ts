import { UseCaseError } from '@/shared/domain/errors/UseCaseError';

class TokenDoesNotExists extends Error implements UseCaseError {
  constructor() {
    super(`The token does not exists.`);
    this.name = 'TokenDoesNotExists';
  }
}

export { TokenDoesNotExists };
