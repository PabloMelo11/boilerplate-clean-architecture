import { Validation } from '@/adapters/presentation/protocols/Validation';
import { CompositeValidation } from '@/shared/validations/CompositeValidation';
import { RequiredFieldValidation } from '@/shared/validations/RequiredFieldValidation';

function makeSendForgotPasswordValidationFactory() {
  const validations: Validation[] = [];

  for (const field of ['email']) {
    validations.push(new RequiredFieldValidation(field));
  }

  return new CompositeValidation(validations);
}

export { makeSendForgotPasswordValidationFactory };
