import nodemailer, { Transporter } from 'nodemailer';

import { IMailProvider } from '@/domain/usecases/_common_/providers/IMailProvider';
import { IMailTemplateProvider } from '@/domain/usecases/_common_/providers/IMailTemplateProvider';

import { SendMailDTO } from '@/domain/usecases/_common_/providers/dtos/SendMailDTO';

class MailProviderEthereal implements IMailProvider {
  private client: Transporter;

  constructor(private mailTemplateProvider: IMailTemplateProvider) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail({
    subject,
    templateData,
    to,
    from,
  }: SendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Clean Code',
        address: from?.email || 'cleancode@example.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export { MailProviderEthereal };
