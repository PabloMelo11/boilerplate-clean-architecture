import { makeSendForgotPasswordValidationFactory } from '@/infra/http/factories/validations/SendForgotPasswordValidationFactory';

import { UsersRepositoryInMemory } from '@/infra/repositories/inMemory/UsersRepository';
import { UsersTokensRepositoryInMemory } from '@/infra/repositories/inMemory/UsersTokensRepository';

import { HandlebarsMailTemplateProvider } from '@/infra/providers/MailTemplateProvider/handlebars/MailTemplateProvider';
import { MailProviderEthereal } from '@/infra/providers/MailProvider/ethereal/MailProvider';
import { MailProviderSES } from '@/infra/providers/MailProvider/ses/MailProvider';
import { DateProviderDayjs } from '@/infra/providers/DateProvider/dayjs/DateProvider';
import { UUIDProvider } from '@/infra/providers/UUIDProvider/uuid/UUIDProvider';

import { SendForgotPasswordMailUseCase } from '@/domain/usecases/sendForgotPasswordMail/SendForgotPasswordMailUseCase';

import { SendForgotPasswordMailController } from '@/adapters/presentation/controllers/SendForgotPasswordMailController';

function makeSendForgotPasswordControllerFactory() {
  const usersRepositoryInMemory = new UsersRepositoryInMemory();
  const usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

  const handlebarsMailTemplateProvider = new HandlebarsMailTemplateProvider();

  const mailProviderSES = new MailProviderSES(handlebarsMailTemplateProvider);

  const mailProviderEthereal = new MailProviderEthereal(
    handlebarsMailTemplateProvider,
  );

  const dateProviderDayjs = new DateProviderDayjs();
  const uuidProvider = new UUIDProvider();

  const diskStorage = {
    ethereal: mailProviderEthereal,
    ses: mailProviderSES,
  };

  const sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
    usersRepositoryInMemory,
    usersTokensRepositoryInMemory,
    diskStorage[process.env.MAIL_DRIVER],
    dateProviderDayjs,
    uuidProvider,
  );

  const sendForgotPasswordMailController = new SendForgotPasswordMailController(
    makeSendForgotPasswordValidationFactory(),
    sendForgotPasswordMailUseCase,
  );

  return sendForgotPasswordMailController;
}

export { makeSendForgotPasswordControllerFactory };
