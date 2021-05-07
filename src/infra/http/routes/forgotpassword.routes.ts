import express from 'express';

import { adaptRoute } from '../adapters/ExpressRouter';

import { makeSendForgotPasswordControllerFactory } from '@/infra/http/factories/controllers/SendForgotPasswordControllerFactory';

const forgotPasswordRoutes = express();

forgotPasswordRoutes.post(
  '/forgot-password',
  adaptRoute(makeSendForgotPasswordControllerFactory()),
);

export { forgotPasswordRoutes };
