import { DomainError } from '@/shared/domain/errors/DomainError';

class InvalidTypeError extends Error implements DomainError {
  constructor(type: string) {
    super(`The type '${type}' is invalid.`);
    this.name = 'InvalidTypeError';
  }
}

export { InvalidTypeError };
