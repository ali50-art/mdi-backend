import express from 'express';

const router = express.Router();

import Authorization from '../../middlewares/auth';
import AuthorizeRole from '../../middlewares/authorizeRole';
import limiter from '../../middlewares/limiter';

import { multerConfig } from '../../utils/multer';
import multer from 'multer';

import passport from 'passport';

import UserValidator from '../../validators/user.validator';
import validator from '../../validators';

import UserController from '../../controllers/v1/user.controller';
import { RolesEnum } from '../../constants/constants';
import userController from '../../controllers/v1/user.controller';

router.post('/login', limiter, validator(UserValidator.loginSchema), UserController.login);

router.post('/register', limiter, UserController.register);

router.get('/logout', Authorization.Authenticated, UserController.logout);

router.get('/refresh-token', UserController.refreshToken);


router.get('/login/success',userController.loginWithGoogle)

router.post(
  '/forgot-password',
  validator(UserValidator.forgotPasswordSchema),
  UserController.forgotPassword,
);
router.get('/teacher/:boite',UserController.getAllTeachers)
router.get('/teacher-student/:id',UserController.getUserById)
router.put(
  '/reset-password/',
  validator(UserValidator.resetPasswordSchema),
  UserController.resetPassword,
);

router.get('/profile', Authorization.Authenticated, UserController.getProfile);

router.put(
  '/profile-update',
  Authorization.Authenticated,
  
  UserController.updateProfile,
);

router.put(
  '/profile-password-update',
  Authorization.Authenticated,
  validator(UserValidator.updateProfilePassword),
  UserController.updateUserPassword,
);

router.post(
  '/avatar-upload',
  Authorization.Authenticated,
  multer(multerConfig).single('file'),
  UserController.avatarUpload,
);

router
  .route('/admin/users')
  .get(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.admin]),
    UserController.getAllUsers,
  )
  .post(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.admin]),
    UserController.createUser,
  );

router
  .route('/teacher')
  .post(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.admin,RolesEnum.teacher]),
    UserController.getUserByData,
  )
router
  .route('/student/:id')
  .put( Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.admin,RolesEnum.teacher]),
    UserController.updateStudent)
router
  .route('/admin/users/:id')
  .get(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.admin,RolesEnum.teacher]),
    UserController.getUserById,
  )
  .put(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.admin,RolesEnum.teacher]),
    UserController.updateUser,
  )
  
  .delete(
    Authorization.Authenticated,
    AuthorizeRole.AuthorizeRole([RolesEnum.admin]),
    UserController.deleteUser,
  );

export default router;
