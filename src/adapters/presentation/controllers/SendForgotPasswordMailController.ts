import { Controller } from '@/adapters/presentation/protocols/Controller';

import {
  HttpResponse,
  clientError,
  serverError,
  ok,
} from '@/adapters/presentation/protocols/HttpResponse';

import { ISendForgotPasswordMailUseCase } from '@/usecases/sendForgotPasswordMail/ISendForgotPasswordMailUseCase';
import { SendForgotPasswordMailRequestDTO } from '@/usecases/sendForgotPasswordMail/dtos/SendForgotPasswordMailRequestDTO';

class SendForgotPasswordMailController implements Controller {
  constructor(
    private readonly sendForgotPasswordMailUseCase: ISendForgotPasswordMailUseCase,
  ) {}

  async handle({
    email,
  }: SendForgotPasswordMailRequestDTO): Promise<HttpResponse> {
    try {
      const result = await this.sendForgotPasswordMailUseCase.sendForgotPasswordMail(
        { email },
      );

      if (result.isLeft()) {
        return clientError(result.value);
      }

      return ok(result.value);
    } catch (err) {
      return serverError(err);
    }
  }
}

export { SendForgotPasswordMailController };
