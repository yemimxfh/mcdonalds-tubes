import { Router } from 'express';
import * as UserController from '../controllers/user';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/forgot-password', UserController.forgotPassword);
router.post('/reset-password', UserController.resetPassword);

export default router;