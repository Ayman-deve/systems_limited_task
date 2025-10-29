import React from 'react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return '#ffc107';
      case 'in-progress':
        return '#007bff';
      case 'completed':
        return '#28a745';
      default:
        return '#6c757d';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#dc3545';
      case 'medium':
        return '#ffc107';
      case 'low':
        return '#28a745';
      default:
        return '#6c757d';
    }
  };

  return (
    <div className="bg-white rounded-lg p-5 shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all hover:translate-y-[-2px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] md:p-4 sm:p-3">
      <div className="flex justify-between items-start mb-3 md:flex-col md:gap-2.5 md:items-start">
        <h3 className="m-0 text-xl text-[#333] flex-1 mr-2.5 md:mr-0 md:text-lg sm:text-base">{task.title}</h3>
        <div className="px-3 py-1 rounded-xl text-white text-xs font-semibold capitalize whitespace-nowrap self-start" style={{ backgroundColor: getStatusColor(task.status) }}>
          {task.status}
        </div>
      </div>

      <p className="text-[#666] mb-4 leading-relaxed md:text-sm sm:text-[13px]">{task.description}</p>

      <div className="mb-4">
        <div className="mb-2 text-sm text-[#555] md:text-[13px] sm:text-xs">
          <strong className="text-[#333]">Priority:</strong>{' '}
          <span className="font-semibold capitalize" style={{ color: getPriorityColor(task.priority) }}>
            {task.priority}
          </span>
        </div>
        {task.assignedTo && (
          <div className="mb-2 text-sm text-[#555] md:text-[13px] sm:text-xs">
            <strong className="text-[#333]">Assigned to:</strong> {task.assignedTo.name}
          </div>
        )}
        {task.dueDate && (
          <div className="mb-2 text-sm text-[#555] md:text-[13px] sm:text-xs">
            <strong className="text-[#333]">Due:</strong> {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}
        <div className="mb-2 text-sm text-[#555] md:text-[13px] sm:text-xs">
          <strong className="text-[#333]">Created by:</strong> {task.createdBy.name}
        </div>
      </div>

      <div className="flex gap-2.5 md:flex-col">
        <button 
          className="flex-1 px-5 py-2.5 bg-[#6c757d] text-white border-none rounded cursor-pointer text-base font-medium hover:bg-[#5a6268] md:w-full"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
        <button 
          className="flex-1 px-5 py-2.5 bg-[#dc3545] text-white border-none rounded cursor-pointer text-base font-medium hover:bg-[#c82333] md:w-full"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

