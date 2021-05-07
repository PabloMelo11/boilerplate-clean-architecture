import { Validation } from '@/adapters/presentation/protocols/Validation';
import { MissingParamError } from '@/adapters/presentation/errors/MissingParamError';

class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName);
    }
  }
}

export { RequiredFieldValidation };
