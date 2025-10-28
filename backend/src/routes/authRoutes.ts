import { Router } from 'express';
import * as authController from '../controllers/authController';
import * as authValidator from '../validators/authValidator';
import { validate } from '../middleware/validator';
import { protect } from '../middleware/auth';

const router = Router();

router.post('/register', validate(authValidator.registerSchema), authController.register);
router.post('/login', validate(authValidator.loginSchema), authController.login);
router.get('/me', protect, authController.getMe);

export default router;

