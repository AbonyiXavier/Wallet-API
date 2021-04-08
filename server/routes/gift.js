import { Router } from 'express';
import verifyToken from '../middlewares/verifyToken';
import GiftController from '../controllers/gift.controller';
const { transferFund, giftHistory } = GiftController;

const router = new Router();

router.post('/transfer', verifyToken, transferFund);
router.get('/gift-history', verifyToken, giftHistory);

export default router;
