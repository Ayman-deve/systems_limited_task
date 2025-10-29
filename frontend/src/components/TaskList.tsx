import React from 'react';
import { Task } from '../types';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-[60px] px-5 bg-white rounded-lg shadow-sm md:py-10 md:px-4 sm:py-[60px] sm:px-3">
        <p className="text-[#666] text-lg md:text-base sm:text-sm">No tasks found. Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-5 md:grid-cols-1 md:gap-4 sm:gap-3">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TaskList;

