import express from 'express';

import { adaptRoute } from '../adapters/ExpressRouter';

import { makeCreateUserControllerFactory } from '../factories/controllers/accounts/createUser/CreateUserControllerFactory';
import { makeListUsersControllerFactory } from '../factories/controllers/accounts/listUsers/ListUsersControllerFactory';

const usersRouter = express();

usersRouter.get('/', adaptRoute(makeListUsersControllerFactory()));
usersRouter.post('/', adaptRoute(makeCreateUserControllerFactory()));

export { usersRouter };
