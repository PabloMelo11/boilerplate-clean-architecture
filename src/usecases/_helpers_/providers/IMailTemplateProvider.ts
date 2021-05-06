import { ParseTemplateDTO } from '@/usecases/_helpers_/providers/dtos/ParseTemplateDTO';

interface IMailTemplateProvider {
  parse(data: ParseTemplateDTO): Promise<string>;
}

export { IMailTemplateProvider };
