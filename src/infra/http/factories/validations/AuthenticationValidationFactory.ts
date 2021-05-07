import { Validation } from '@/adapters/presentation/protocols/Validation';
import { CompositeValidation } from '@/shared/validations/CompositeValidation';
import { RequiredFieldValidation } from '@/shared/validations/RequiredFieldValidation';

function makeAuthenticationValidationFactory(): CompositeValidation {
  const validations: Validation[] = [];

  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field));
  }

  return new CompositeValidation(validations);
}

export { makeAuthenticationValidationFactory };
