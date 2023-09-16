import express from 'express';
import userRoutes from './v1/user.route';
import offerCategoryRoutes from './v1/offerCategory.route'
const router = express.Router();

router.use('/', userRoutes, offerCategoryRoutes);

export default router;
