import { Router } from 'express';

const router: Router = Router();

import Authorization from '../../middlewares/auth';
import AuthorizeRole from '../../middlewares/authorizeRole';

import TodoValidator from '../../validators/todo.validator';
import validator from '../../validators';
import { multerConfig } from '../../utils/multer';
import multer from 'multer';

import ReservationController from '../../controllers/v1/reservation.controller';
import { RolesEnum } from '../../constants/constants';

router
  .route('/reservation')
  .get(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.teacher,RolesEnum.student, RolesEnum.admin]),
    ReservationController.getAll,
  )
  .post(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.student,RolesEnum.admin]),
    multer(multerConfig).single('file'),
    ReservationController.create,
  );
  router
  .route('/reservation/:id')
  .put(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.student, RolesEnum.admin]),
    multer(multerConfig).single('file'),
    ReservationController.edit,
  )
  .delete(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.student, RolesEnum.admin]),
    ReservationController.remove,
  );

export default router;
