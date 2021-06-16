import fs from 'fs';
import handlebars from 'handlebars';

import { IMailTemplateProvider } from '@/domain/usecases/_common_/providers/IMailTemplateProvider';
import { ParseTemplateDTO } from '@/domain/usecases/_common_/providers/dtos/ParseTemplateDTO';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ file, variables }: ParseTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}

export { HandlebarsMailTemplateProvider };
