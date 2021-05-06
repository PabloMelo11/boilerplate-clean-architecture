import { SendForgotPasswordMailRequestDTO } from '@/usecases/sendForgotPasswordMail/dtos/SendForgotPasswordMailRequestDTO';
import { SendForgotPasswordMailResponseDTO } from '@/usecases/sendForgotPasswordMail/dtos/SendForgotPasswordMailResponseDTO';

interface ISendForgotPasswordMailUseCase {
  sendForgotPasswordMail(
    data: SendForgotPasswordMailRequestDTO,
  ): Promise<SendForgotPasswordMailResponseDTO>;
}

export { ISendForgotPasswordMailUseCase };
