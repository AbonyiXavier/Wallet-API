import { Router } from 'express';
import verifyToken from '../middlewares/verifyToken';
import TransactionController from '../controllers/transaction.controller';
const { fundWallet, getVerifyWallet } = TransactionController;

const router = new Router();

router.post('/paystack/fund', verifyToken, fundWallet);
router.get('/paystack/callback', getVerifyWallet);

export default router;
