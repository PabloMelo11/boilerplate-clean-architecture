import express from 'express';

import { adaptRoute } from '../adapters/ExpressRouter';
import { makeCreateUserController } from '../factories/controllers/accounts/createUser/CreateUserControllerFactory';

const usersRouter = express();

usersRouter.post('/', adaptRoute(makeCreateUserController()));

export { usersRouter };
