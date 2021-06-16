import { SendMailDTO } from '@/domain/usecases/_common_/providers/dtos/SendMailDTO';

interface IMailProvider {
  sendMail(data: SendMailDTO): Promise<void>;
}

export { IMailProvider };
