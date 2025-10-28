import bcrypt from 'bcryptjs';
import { IUser, User } from '../models/User';
import { generateToken } from '../utils/jwt';
import logger from '../utils/logger';

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: string
): Promise<{ user: IUser; token: string }> => {
  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  // Generate token
  const token = generateToken(user._id.toString());

  logger.info(`User registered: ${user.email}`);
  return { user, token };
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{ user: IUser; token: string }> => {
  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Generate token
  const token = generateToken(user._id.toString());

  logger.info(`User logged in: ${user.email}`);
  return { user, token };
};

export const getUserById = async (userId: string): Promise<IUser> => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

