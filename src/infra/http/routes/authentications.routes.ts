import express from 'express';

import { adaptRoute } from '../adapters/ExpressRouter';

import { makeAuthenticateUserControllerFactory } from '@/infra/http/factories/controllers/AuthenticateUserControllerFactory';
import { makeRefreshTokenControllerFactory } from '@/infra/http/factories/controllers/RefreshTokenControllerFactory';

const authenticationsRoutes = express();

authenticationsRoutes.post(
  '/sessions',
  adaptRoute(makeAuthenticateUserControllerFactory()),
);

authenticationsRoutes.post(
  '/refresh-token',
  adaptRoute(makeRefreshTokenControllerFactory()),
);

export { authenticationsRoutes };
