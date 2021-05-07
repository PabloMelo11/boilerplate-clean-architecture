import express from 'express';

import { adaptRoute } from '../adapters/ExpressRouter';

import { makeSendForgotPasswordControllerFactory } from '@/infra/http/factories/controllers/SendForgotPasswordControllerFactory';
import { makeResetPasswordControllerFactory } from '@/infra/http/factories/controllers/ResetPasswordControllerFactory';

const forgotPasswordRoutes = express();

forgotPasswordRoutes.post(
  '/forgot-password',
  adaptRoute(makeSendForgotPasswordControllerFactory()),
);

forgotPasswordRoutes.post(
  '/reset-password',
  adaptRoute(makeResetPasswordControllerFactory()),
);

export { forgotPasswordRoutes };
