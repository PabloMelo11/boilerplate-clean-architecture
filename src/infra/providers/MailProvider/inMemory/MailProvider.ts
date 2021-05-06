import { IMailProvider } from '@/usecases/_helpers_/providers/IMailProvider';

import { SendMailDTO } from '@/usecases/_helpers_/providers/dtos/SendMailDTO';

class MailProviderInMemory implements IMailProvider {
  private mails: SendMailDTO[] = [];

  async sendMail(mail: SendMailDTO): Promise<void> {
    this.mails.push(mail);
  }
}

export { MailProviderInMemory };
