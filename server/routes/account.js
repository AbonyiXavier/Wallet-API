import { Router } from 'express';
import verifyToken from '../middlewares/verifyToken';
import AccountController from '../controllers/account.controller';
const { getBalance } = AccountController;

const router = new Router();

router.get('/account', verifyToken, getBalance);

export default router;
