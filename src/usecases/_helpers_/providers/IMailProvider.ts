import { SendMailDTO } from '@/usecases/_helpers_/providers/dtos/SendMailDTO';

interface IMailProvider {
  sendMail(data: SendMailDTO): Promise<void>;
}

export { IMailProvider };
