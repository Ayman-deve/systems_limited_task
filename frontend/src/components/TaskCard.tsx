import React from 'react';
import { Task } from '../types';
import './TaskCard.css';

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
    <div className="task-card">
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-status" style={{ backgroundColor: getStatusColor(task.status) }}>
          {task.status}
        </div>
      </div>

      <p className="task-description">{task.description}</p>

      <div className="task-details">
        <div className="task-detail-item">
          <strong>Priority:</strong>{' '}
          <span className="task-priority" style={{ color: getPriorityColor(task.priority) }}>
            {task.priority}
          </span>
        </div>
        {task.assignedTo && (
          <div className="task-detail-item">
            <strong>Assigned to:</strong> {task.assignedTo.name}
          </div>
        )}
        {task.dueDate && (
          <div className="task-detail-item">
            <strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}
        <div className="task-detail-item">
          <strong>Created by:</strong> {task.createdBy.name}
        </div>
      </div>

      <div className="task-actions">
        <button className="btn btn-secondary" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

