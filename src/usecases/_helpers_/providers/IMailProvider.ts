import { SendForgotPasswordMailDTO } from '@/usecases/_helpers_/providers/dtos/SendForgotPasswordMailDTO';

interface IMailProvider {
  sendMail(data: SendForgotPasswordMailDTO): Promise<void>;
}

export { IMailProvider };
