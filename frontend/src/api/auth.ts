import axiosInstance from './axios';
import { AuthResponse, User } from '../types';

export const register = async (
  name: string,
  email: string,
  password: string,
  role: string = 'member'
): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/api/auth/register', {
    name,
    email,
    password,
    role,
  });
  return response.data;
};

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/api/auth/login', {
    email,
    password,
  });
  return response.data;
};

export const getMe = async (): Promise<{ success: boolean; data: { user: User } }> => {
  const response = await axiosInstance.get('/api/auth/me');
  return response.data;
};

