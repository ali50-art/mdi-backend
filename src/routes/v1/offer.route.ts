import { Router } from 'express';

const router: Router = Router();

import Authorization from '../../middlewares/auth';
import AuthorizeRole from '../../middlewares/authorizeRole';

import TodoValidator from '../../validators/todo.validator';
import validator from '../../validators';
import { multerConfig } from '../../utils/multer';
import multer from 'multer';

import OfferController from '../../controllers/v1/offer.controller';
import { RolesEnum } from '../../constants/constants';

router
  .route('/offers')
  .get(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.student, RolesEnum.admin]),
    OfferController.getAll,
  )
  .post(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.admin]),
    multer(multerConfig).single('file'),
    OfferController.create,
  );

router
  .route('/offer/:id')
  .get(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.student, RolesEnum.admin]),
    OfferController.getById,
  )
  .put(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.student, RolesEnum.admin]),
    multer(multerConfig).single('file'),
    OfferController.edit,
  )
  .delete(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.student, RolesEnum.admin]),
    OfferController.remove,
  );

export default router;
