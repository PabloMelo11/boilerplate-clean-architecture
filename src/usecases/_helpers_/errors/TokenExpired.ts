import { UseCaseError } from '@/shared/domain/errors/UseCaseError';

class TokenExpired extends Error implements UseCaseError {
  constructor() {
    super(`The token is expired, try again.`);
    this.name = 'TokenExpired';
  }
}

export { TokenExpired };
