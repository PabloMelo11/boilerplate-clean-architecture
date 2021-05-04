import express from 'express';

import { adaptRoute } from '../adapters/ExpressRouter';

import { makeAuthenticateUserControllerFactory } from '@/infra/http/factories/controllers/accounts/authenticateUser/AuthenticateUserControllerFactory';

const authenticationsRoutes = express();

authenticationsRoutes.post(
  '/sessions',
  adaptRoute(makeAuthenticateUserControllerFactory()),
);

export { authenticationsRoutes };
