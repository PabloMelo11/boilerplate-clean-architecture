import { SendForgotPasswordMailRequestDTO } from '@/domain/usecases/sendForgotPasswordMail/dtos/SendForgotPasswordMailRequestDTO';
import { SendForgotPasswordMailResponseDTO } from '@/domain/usecases/sendForgotPasswordMail/dtos/SendForgotPasswordMailResponseDTO';

interface ISendForgotPasswordMailUseCase {
  sendForgotPasswordMail(
    data: SendForgotPasswordMailRequestDTO,
  ): Promise<SendForgotPasswordMailResponseDTO>;
}

export { ISendForgotPasswordMailUseCase };
