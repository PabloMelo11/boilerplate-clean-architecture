import { UseCaseError } from '@/shared/domain/errors/UseCaseError';

class PasswordDoesNotMatch extends Error implements UseCaseError {
  constructor() {
    super(`The password does not match.`);
    this.name = 'PasswordDoesNotMatch';
  }
}

export { PasswordDoesNotMatch };
