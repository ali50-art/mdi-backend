import express from 'express';
import userRoutes from './v1/user.route';
import offerCategoryRoutes from './v1/offerCategory.route'
import offer from './v1/offer.route'
import disponibility from './v1/disponibility.route'
import reservation from './v1/reservation.route'
const router = express.Router();

router.use('/', userRoutes, offerCategoryRoutes,offer,disponibility,reservation);

export default router;
