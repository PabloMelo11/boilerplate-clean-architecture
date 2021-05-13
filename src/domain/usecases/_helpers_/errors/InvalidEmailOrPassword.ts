import { UseCaseError } from '@/shared/domain/errors/UseCaseError';

class InvalidEmailOrPassword extends Error implements UseCaseError {
  constructor() {
    super(`Invalid e-mail/password combination.`);
    this.name = 'InvalidEmailOrPassword';
  }
}

export { InvalidEmailOrPassword };
