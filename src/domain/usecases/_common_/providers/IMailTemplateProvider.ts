import { ParseTemplateDTO } from '@/domain/usecases/_common_/providers/dtos/ParseTemplateDTO';

interface IMailTemplateProvider {
  parse(data: ParseTemplateDTO): Promise<string>;
}

export { IMailTemplateProvider };
