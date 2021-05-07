import { Validation } from '@/adapters/presentation/protocols/Validation';
import { CompositeValidation } from '@/shared/validations/CompositeValidation';
import { RequiredFieldValidation } from '@/shared/validations/RequiredFieldValidation';

function makeListUsersValidationFactory(): CompositeValidation {
  const validations: Validation[] = [];

  for (const field of ['except_current_user_id']) {
    validations.push(new RequiredFieldValidation(field));
  }

  return new CompositeValidation(validations);
}

export { makeListUsersValidationFactory };
