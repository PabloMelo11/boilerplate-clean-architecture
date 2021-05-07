import { Router } from 'express';

import { usersRouter } from './users.routes';
import { authenticationsRoutes } from './authentications.routes';
import { profileRoutes } from './profile.routes';
import { forgotPasswordRoutes } from './forgotpassword.routes';

const router = Router();

router.use('/users', usersRouter);
router.use(authenticationsRoutes);
router.use(profileRoutes);
router.use(forgotPasswordRoutes);

export { router };
