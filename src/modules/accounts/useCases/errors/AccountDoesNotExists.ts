import { UseCaseError } from '@/shared/domain/errors/UseCaseError';

class AccountDoesNotExists extends Error implements UseCaseError {
  constructor(id: string) {
    super(`The account with id '${id}' does not exists.`);
    this.name = 'AccountDoesNotExists';
  }
}

export { AccountDoesNotExists };
