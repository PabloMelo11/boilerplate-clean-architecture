import { Validation } from '@/adapters/presentation/protocols/Validation';
import { CompositeValidation } from '@/shared/validations/CompositeValidation';
import { RequiredFieldValidation } from '@/shared/validations/RequiredFieldValidation';

function makeCreateUserValidationFactory(): CompositeValidation {
  const validations: Validation[] = [];

  for (const field of ['name', 'password', 'email', 'driver_license']) {
    validations.push(new RequiredFieldValidation(field));
  }

  return new CompositeValidation(validations);
}

export { makeCreateUserValidationFactory };
