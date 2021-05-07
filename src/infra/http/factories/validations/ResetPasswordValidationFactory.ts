import { Validation } from '@/adapters/presentation/protocols/Validation';
import { CompositeValidation } from '@/shared/validations/CompositeValidation';
import { RequiredFieldValidation } from '@/shared/validations/RequiredFieldValidation';
import { CompareFieldsValidation } from '@/shared/validations/CompareFieldsValidation';

function makeResetPasswordValidationFactory(): CompositeValidation {
  const validations: Validation[] = [];

  for (const field of ['password', 'password_confirmation', 'token']) {
    validations.push(new RequiredFieldValidation(field));
  }

  validations.push(
    new CompareFieldsValidation('password', 'password_confirmation'),
  );

  return new CompositeValidation(validations);
}

export { makeResetPasswordValidationFactory };
