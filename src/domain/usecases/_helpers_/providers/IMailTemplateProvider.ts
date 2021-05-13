import { ParseTemplateDTO } from '@/domain/usecases/_helpers_/providers/dtos/ParseTemplateDTO';

interface IMailTemplateProvider {
  parse(data: ParseTemplateDTO): Promise<string>;
}

export { IMailTemplateProvider };
