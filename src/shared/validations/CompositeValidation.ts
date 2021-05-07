import { Validation } from '@/adapters/presentation/protocols/Validation';

class CompositeValidation implements Validation {
  constructor(private readonly validations: Validation[]) {}

  validate(input: any): Error {
    for (const validation of this.validations) {
      const error = validation.validate(input);
      if (error) {
        return error;
      }
    }
  }
}

export { CompositeValidation };
