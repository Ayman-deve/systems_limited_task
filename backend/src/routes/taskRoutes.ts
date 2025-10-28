import { Router } from 'express';
import * as taskController from '../controllers/taskController';
import * as taskValidator from '../validators/taskValidator';
import { validate } from '../middleware/validator';
import { protect } from '../middleware/auth';

const router = Router();

router
  .route('/')
  .get(protect, taskController.getAllTasks)
  .post(protect, validate(taskValidator.createTaskSchema), taskController.createTask);

router
  .route('/:id')
  .get(protect, taskController.getTaskById)
  .put(protect, validate(taskValidator.updateTaskSchema), taskController.updateTask)
  .delete(protect, taskController.deleteTask);

export default router;

