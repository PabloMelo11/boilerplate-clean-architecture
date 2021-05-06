import aws from 'aws-sdk';
import nodemailer, { Transporter } from 'nodemailer';

import mailConfig from '@/shared/config/mail';

import { IMailProvider } from '@/usecases/_helpers_/providers/IMailProvider';
import { IMailTemplateProvider } from '@/usecases/_helpers_/providers/IMailTemplateProvider';

import { SendMailDTO } from '@/usecases/_helpers_/providers/dtos/SendMailDTO';

class MailProviderSES implements IMailProvider {
  private client: Transporter;

  constructor(private mailTemplateProvider: IMailTemplateProvider) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-east-1',
      }),
    });
  }

  public async sendMail({
    to,
    subject,
    from,
    templateData,
  }: SendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}

export { MailProviderSES };
