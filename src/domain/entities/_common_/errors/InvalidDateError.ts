import { DomainError } from '@/shared/domain/errors/DomainError';

class InvalidDateError extends Error implements DomainError {
  constructor(date: Date) {
    super(`The date '${date}' is invalid.`);
    this.name = 'InvalidDateError';
  }
}

export { InvalidDateError };
