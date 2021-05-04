import { Router } from 'express';

import { usersRouter } from './users.routes';
import { authenticationsRoutes } from './authentications.routes';

const router = Router();

router.use('/users', usersRouter);
router.use(authenticationsRoutes);

export { router };
