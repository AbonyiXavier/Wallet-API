import { Router } from 'express';
import UserController from '../controllers/user.controller';
import Validation from '../validation/validation';
const {
  validateSignupDetails,
  validateLoginDetails,
  validatePassword,
} = Validation;
const { signup, login, getAllUsers } = UserController;

const router = new Router();

router.post('/signup', validateSignupDetails, signup);
router.post('/login', validatePassword, validateLoginDetails, login);
router.get('/users', getAllUsers);

export default router;
