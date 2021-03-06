import { ParseTemplateDTO } from '@/domain/usecases/_common_/providers/dtos/ParseTemplateDTO';

type MailContactDTO = {
  name: string;
  email: string;
};

type SendMailDTO = {
  to: MailContactDTO;
  from?: MailContactDTO;
  subject: string;
  templateData: ParseTemplateDTO;
};

export { SendMailDTO };
