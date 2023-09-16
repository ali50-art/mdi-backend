import { Router } from 'express';

const router: Router = Router();

import Authorization from '../../middlewares/auth';
import AuthorizeRole from '../../middlewares/authorizeRole';

import TodoValidator from '../../validators/todo.validator';
import validator from '../../validators';
import { multerConfig } from '../../utils/multer';
import multer from 'multer';

import OfferCategoryController from '../../controllers/v1/offerCategory.controller';
import { RolesEnum } from '../../constants/constants';

router
  .route('/offerCategory')
  .get(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.student, RolesEnum.admin]),
    OfferCategoryController.getAll,
  )
  .post(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.student, RolesEnum.admin]),
    multer(multerConfig).single('file'),
    OfferCategoryController.create,
  );

router
  .route('/offerCategory/:id')
  .get(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.student, RolesEnum.admin]),
    OfferCategoryController.getById,
  )
  .put(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.student, RolesEnum.admin]),
    multer(multerConfig).single('file'),
    OfferCategoryController.edit,
  )
  .delete(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.student, RolesEnum.admin]),
    OfferCategoryController.remove,
  );

router
  .route('/admin/offerCategory')
  .get(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.admin]),
    OfferCategoryController.getAllAdmin,
  );

router
  .route('/admin/offerCategory/:id')
  .get(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.admin]),
    OfferCategoryController.getByIdAdmin,
  )
  .put(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.admin]),
    validator(TodoValidator.todoSchema),
    OfferCategoryController.editAdmin,
  )
  .delete(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.admin]),
    OfferCategoryController.removeAdmin,
  );


export default router;
