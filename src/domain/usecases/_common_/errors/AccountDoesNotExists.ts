import { UseCaseError } from '@/shared/domain/errors/UseCaseError';

class AccountDoesNotExists extends Error implements UseCaseError {
  constructor() {
    super(`The account does not exists.`);
    this.name = 'AccountDoesNotExists';
  }
}

export { AccountDoesNotExists };
