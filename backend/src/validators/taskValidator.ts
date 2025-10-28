import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string().required().trim().min(1).max(100),
  description: Joi.string().required().trim().min(1).max(500),
  status: Joi.string().valid('todo', 'in-progress', 'completed').default('todo'),
  priority: Joi.string().valid('low', 'medium', 'high').default('medium'),
  assignedTo: Joi.string().allow(null, ''),
  dueDate: Joi.date().optional().allow(null, ''),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().trim().min(1).max(100),
  description: Joi.string().trim().min(1).max(500),
  status: Joi.string().valid('todo', 'in-progress', 'completed'),
  priority: Joi.string().valid('low', 'medium', 'high'),
  assignedTo: Joi.string().allow(null, ''),
  dueDate: Joi.date().allow(null, ''),
});

