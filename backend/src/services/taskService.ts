import { ITask, Task } from '../models/Task';
import logger from '../utils/logger';

export const createTask = async (
  title: string,
  description: string,
  createdBy: string,
  status: string,
  priority: string,
  assignedTo: string | null,
  dueDate?: Date
): Promise<ITask> => {
  const task = await Task.create({
    title,
    description,
    createdBy,
    status,
    priority,
    assignedTo: assignedTo || null,
    dueDate,
  });

  await task.populate('assignedTo', 'name email');
  await task.populate('createdBy', 'name email');

  logger.info(`Task created: ${task._id}`);
  return task;
};

export const getAllTasks = async (userId?: string): Promise<ITask[]> => {
  let query: any = {};
  if (userId) {
    query.$or = [
      { assignedTo: userId },
      { createdBy: userId },
    ];
  }

  const tasks = await Task.find(query)
    .populate('assignedTo', 'name email')
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 });

  return tasks;
};

export const getTaskById = async (taskId: string): Promise<ITask> => {
  const task = await Task.findById(taskId)
    .populate('assignedTo', 'name email')
    .populate('createdBy', 'name email');

  if (!task) {
    throw new Error('Task not found');
  }

  return task;
};

export const updateTask = async (
  taskId: string,
  userId: string,
  updateData: {
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
    assignedTo?: string | null;
    dueDate?: Date;
  }
): Promise<ITask> => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error('Task not found');
  }

  // Only creator can update (for simplicity)
  // In a full app, you might want to allow assigned users to update status
  if (task.createdBy.toString() !== userId) {
    throw new Error('Not authorized to update this task');
  }

  // Update only provided fields
  if (updateData.title !== undefined) task.title = updateData.title;
  if (updateData.description !== undefined) task.description = updateData.description;
  if (updateData.status !== undefined) task.status = updateData.status as any;
  if (updateData.priority !== undefined) task.priority = updateData.priority as any;
  if (updateData.assignedTo !== undefined) task.assignedTo = updateData.assignedTo as any;
  if (updateData.dueDate !== undefined) task.dueDate = updateData.dueDate;
  
  await task.save();

  await task.populate('assignedTo', 'name email');
  await task.populate('createdBy', 'name email');

  logger.info(`Task updated: ${task._id}`);
  return task;
};

export const deleteTask = async (taskId: string, userId: string): Promise<void> => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error('Task not found');
  }

  // Only creator can delete task
  if (task.createdBy.toString() !== userId) {
    throw new Error('Not authorized to delete this task');
  }

  await Task.findByIdAndDelete(taskId);
  logger.info(`Task deleted: ${taskId}`);
};

