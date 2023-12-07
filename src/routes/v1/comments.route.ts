import { Router } from 'express';

const router: Router = Router();

import Authorization from '../../middlewares/auth';
import AuthorizeRole from '../../middlewares/authorizeRole';

import TodoValidator from '../../validators/todo.validator';
import validator from '../../validators';
import { multerConfig } from '../../utils/multer';
import multer from 'multer';

import CommentController from '../../controllers/v1/comments.controller';
import { RolesEnum } from '../../constants/constants';

router
  .route('/comment')
  .post(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.teacher, RolesEnum.admin]),
    multer(multerConfig).single('file'),
    CommentController.create,
  );

export default router;
