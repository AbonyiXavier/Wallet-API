import { Router } from 'express';
import userRoute from './user';
import accountRoute from './account';
import transactionRoute from './transaction';
import giftRoute from './gift';
import withdrawRoute from './withdraw';

const router = new Router();

router.use('/v1', userRoute);
router.use('/v1', accountRoute);
router.use('/v1', transactionRoute);
router.use('/v1', giftRoute);
router.use('/v1', withdrawRoute);

export default router;
