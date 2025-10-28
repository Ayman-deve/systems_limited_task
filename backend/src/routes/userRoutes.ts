import { Router } from 'express';
import * as userController from '../controllers/userController';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/', protect, userController.getAllUsers);

export default router;

