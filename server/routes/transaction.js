import { Router } from 'express';
import verifyToken from '../middlewares/verifyToken';
import TransactionController from '../controllers/transaction.controller';
const { fundWallet, getVerifyWallet, receipt } = TransactionController;

const router = new Router();

router.post('/paystack/fund', verifyToken, fundWallet);
router.get('/paystack/callback', getVerifyWallet);
router.get('/receipt/:id', verifyToken, receipt);

export default router;
