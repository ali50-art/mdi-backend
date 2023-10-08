import express from 'express';
import userRoutes from './v1/user.route';
import offerCategoryRoutes from './v1/offerCategory.route'
import offer from './v1/offer.route'
const router = express.Router();

router.use('/', userRoutes, offerCategoryRoutes,offer);

export default router;
