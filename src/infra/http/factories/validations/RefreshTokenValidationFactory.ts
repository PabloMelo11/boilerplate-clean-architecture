import { Validation } from '@/adapters/presentation/protocols/Validation';
import { CompositeValidation } from '@/shared/validations/CompositeValidation';
import { RequiredFieldValidation } from '@/shared/validations/RequiredFieldValidation';

function makeRefreshTokenValidationFactory(): CompositeValidation {
  const validations: Validation[] = [];

  for (const field of ['refresh_token']) {
    validations.push(new RequiredFieldValidation(field));
  }

  return new CompositeValidation(validations);
}

export { makeRefreshTokenValidationFactory };
