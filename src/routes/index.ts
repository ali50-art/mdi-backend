import express from 'express';
import userRoutes from './v1/user.route';
import todoRoutes from './v1/todo.route';

const router = express.Router();

router.use('/', userRoutes, todoRoutes);

export default router;
