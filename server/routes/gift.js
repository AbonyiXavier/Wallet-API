import { Router } from 'express';
import verifyToken from '../middlewares/verifyToken';
import GiftController from '../controllers/gift.controller';
const { transferFund } = GiftController;

const router = new Router();

router.post('/transfer', verifyToken, transferFund);

export default router;
