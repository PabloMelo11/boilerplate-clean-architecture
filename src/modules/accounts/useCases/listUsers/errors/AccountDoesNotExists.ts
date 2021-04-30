import { UseCaseError } from '@/core/domain/errors/UseCaseError';

export class AccountDoesNotExists extends Error implements UseCaseError {
  constructor(id: string) {
    super(`The account with id '${id}' does not exists.`);
    this.name = 'AccountDoesNotExists';
  }
}
