import { Controller } from '@/adapters/presentation/protocols/Controller';

import {
  HttpResponse,
  clientError,
  serverError,
  notContent,
} from '@/adapters/presentation/protocols/HttpResponse';

import { Validation } from '@/adapters/presentation/protocols/Validation';

import { ISendForgotPasswordMailUseCase } from '@/domain/usecases/sendForgotPasswordMail/ISendForgotPasswordMailUseCase';
import { SendForgotPasswordMailRequestDTO } from '@/domain/usecases/sendForgotPasswordMail/dtos/SendForgotPasswordMailRequestDTO';

class SendForgotPasswordMailController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly sendForgotPasswordMailUseCase: ISendForgotPasswordMailUseCase,
  ) {}

  async handle({
    email,
  }: SendForgotPasswordMailRequestDTO): Promise<HttpResponse> {
    try {
      const error = this.validation.validate({
        email,
      });

      if (error) {
        return clientError(error);
      }

      const result = await this.sendForgotPasswordMailUseCase.sendForgotPasswordMail(
        { email },
      );

      if (result.isLeft()) {
        return clientError(result.value);
      }

      return notContent();
    } catch (err) {
      return serverError(err);
    }
  }
}

export { SendForgotPasswordMailController };
