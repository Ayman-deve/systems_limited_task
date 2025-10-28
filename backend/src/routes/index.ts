import { Router } from 'express';
import authRoutes from './authRoutes';
import taskRoutes from './taskRoutes';
import userRoutes from './userRoutes';

const router = Router();

router.use('/api/auth', authRoutes);
router.use('/api/tasks', taskRoutes);
router.use('/api/users', userRoutes);

export default router;

