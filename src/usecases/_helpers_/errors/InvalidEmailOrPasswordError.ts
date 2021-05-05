import { UseCaseError } from '@/shared/domain/errors/UseCaseError';

class InvalidEmailOrPasswordError extends Error implements UseCaseError {
  constructor() {
    super(`Invalid e-mail/password combination.`);
    this.name = 'InvalidEmailOrPasswordError';
  }
}

export { InvalidEmailOrPasswordError };
