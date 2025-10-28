import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import * as taskService from '../services/taskService';

export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, status, priority, assignedTo, dueDate } = req.body;
    const userId = req.user._id.toString();

    const task = await taskService.createTask(
      title,
      description,
      userId,
      status || 'todo',
      priority || 'medium',
      assignedTo,
      dueDate ? new Date(dueDate) : undefined
    );

    res.status(201).json({
      success: true,
      data: { task },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const getAllTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const tasks = await taskService.getAllTasks();

    res.status(200).json({
      success: true,
      data: { tasks, count: tasks.length },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const getTaskById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const task = await taskService.getTaskById(id);

    res.status(200).json({
      success: true,
      data: { task },
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user._id.toString();
    const { title, description, status, priority, assignedTo, dueDate } = req.body;

    const updateData: any = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo || null;
    if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null;

    const task = await taskService.updateTask(id, userId, updateData);

    res.status(200).json({
      success: true,
      data: { task },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user._id.toString();

    await taskService.deleteTask(id, userId);

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

