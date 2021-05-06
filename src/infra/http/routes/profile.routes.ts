import express from 'express';
import multer from 'multer';

import uploadConfig from '@/shared/config/upload';

import { adaptRoute } from '../adapters/ExpressRouter';
import { auth } from '@/infra/http/middlewares/auth';

import { makeShowProfileUser } from '@/infra/http/factories/controllers/ShowProfileUserFactory';
import { makeUpdateAvatarUserControllerFactory } from '@/infra/http/factories/controllers/UpdateAvatarUserControllerFactory';

const profileRoutes = express();

const uploadAvatar = multer(uploadConfig);

profileRoutes.get('/me', auth, adaptRoute(makeShowProfileUser()));

profileRoutes.patch(
  '/me/avatar',
  auth,
  uploadAvatar.single('avatar'),
  adaptRoute(makeUpdateAvatarUserControllerFactory()),
);

export { profileRoutes };
