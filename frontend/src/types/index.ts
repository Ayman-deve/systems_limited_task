export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedTo: User | null;
  createdBy: User;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
}

export interface TasksResponse {
  success: boolean;
  data: {
    tasks: Task[];
    count: number;
  };
}

export interface TaskResponse {
  success: boolean;
  data: {
    task: Task;
  };
}

export interface CreateTaskData {
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string | null;
  dueDate?: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: 'todo' | 'in-progress' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  assignedTo?: string | null;
  dueDate?: string;
}

