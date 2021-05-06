import { SendForgotPasswordMailRequestDTO } from '@/usecases/SendForgotPasswordMail/dtos/SendForgotPasswordMailRequestDTO';
import { SendForgotPasswordMailResponseDTO } from '@/usecases/SendForgotPasswordMail/dtos/SendForgotPasswordMailResponseDTO';

interface ISendForgotPasswordMail {
  sendForgotPasswordMail(
    data: SendForgotPasswordMailRequestDTO,
  ): Promise<SendForgotPasswordMailResponseDTO>;
}

export { ISendForgotPasswordMail };
