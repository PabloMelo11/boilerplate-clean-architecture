import express from 'express';

import { adaptRoute } from '../adapters/ExpressRouter';
import { auth } from '@/infra/http/middlewares/auth';

import { makeShowProfileUser } from '@/infra/http/factories/controllers/ShowProfileUserFactory';

const profileRoutes = express();

profileRoutes.get('/me', auth, adaptRoute(makeShowProfileUser()));

export { profileRoutes };
