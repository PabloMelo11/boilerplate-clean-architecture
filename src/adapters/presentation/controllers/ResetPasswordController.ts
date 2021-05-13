import { Controller } from '@/adapters/presentation/protocols/Controller';

import {
  HttpResponse,
  clientError,
  serverError,
  notContent,
} from '@/adapters/presentation/protocols/HttpResponse';

import { Validation } from '@/adapters/presentation/protocols/Validation';

import { ResetPasswordRequestDTO } from '@/domain/usecases/resetPassword/dtos/ResetPasswordRequestDTO';

import { IResetPasswordUseCase } from '@/domain/usecases/resetPassword/IResetPasswordUseCase';

class ResetPasswordController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly resetPasswordUseCase: IResetPasswordUseCase,
  ) {}
  async handle({
    password,
    password_confirmation,
    token,
  }: ResetPasswordRequestDTO): Promise<HttpResponse> {
    try {
      const error = this.validation.validate({
        password,
        password_confirmation,
        token,
      });

      if (error) {
        return clientError(error);
      }

      const result = await this.resetPasswordUseCase.resetPassword({
        password,
        password_confirmation,
        token,
      });

      if (result.isLeft()) {
        return clientError(result.value);
      }

      return notContent();
    } catch (err) {
      return serverError(err);
    }
  }
}

export { ResetPasswordController };
