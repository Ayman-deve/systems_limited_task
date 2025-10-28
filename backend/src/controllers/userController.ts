import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { User } from '../models/User';
import logger from '../utils/logger';

export const getAllUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const users = await User.find().select('name email role');

    res.status(200).json({
      success: true,
      data: { users },
    });
  } catch (error: any) {
    logger.error('Get all users error:', error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

