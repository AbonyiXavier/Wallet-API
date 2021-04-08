import { Router } from 'express';
import verifyToken from '../middlewares/verifyToken';
import WithdrawController from '../controllers/withdraw.controller';
const { sendToAccount, withdrawHistory } = WithdrawController;

const router = new Router();

router.post('/send-to-account', verifyToken, sendToAccount);
router.get('/withdraw-history', verifyToken, withdrawHistory);

export default router;
