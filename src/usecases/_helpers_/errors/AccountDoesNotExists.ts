import { UseCaseError } from '@/shared/domain/errors/UseCaseError';

class AccountDoesNotExists extends Error implements UseCaseError {
  constructor(data: string) {
    super(`The account '${data}' does not exists.`);
    this.name = 'AccountDoesNotExists';
  }
}

export { AccountDoesNotExists };
