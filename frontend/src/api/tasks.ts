import axiosInstance from './axios';
import { TasksResponse, TaskResponse, CreateTaskData, UpdateTaskData } from '../types';

export const getAllTasks = async (): Promise<TasksResponse> => {
  const response = await axiosInstance.get('/api/tasks');
  return response.data;
};

export const getTaskById = async (id: string): Promise<TaskResponse> => {
  const response = await axiosInstance.get(`/api/tasks/${id}`);
  return response.data;
};

export const createTask = async (data: CreateTaskData): Promise<TaskResponse> => {
  const response = await axiosInstance.post('/api/tasks', data);
  return response.data;
};

export const updateTask = async (
  id: string,
  data: UpdateTaskData
): Promise<TaskResponse> => {
  const response = await axiosInstance.put(`/api/tasks/${id}`, data);
  return response.data;
};

export const deleteTask = async (id: string): Promise<{ success: boolean }> => {
  const response = await axiosInstance.delete(`/api/tasks/${id}`);
  return response.data;
};

export const getAllUsers = async (): Promise<{ success: boolean; data: { users: any[] } }> => {
  const response = await axiosInstance.get('/api/users');
  return response.data;
};

