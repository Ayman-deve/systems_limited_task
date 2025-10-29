import React, { useState, useEffect } from 'react';
import { Task, User } from '../types';
import * as taskAPI from '../api/tasks';
import { getAllUsers } from '../api/tasks';

interface TaskModalProps {
  task: Task | null;
  onClose: () => void;
  onSave: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'todo' | 'in-progress' | 'completed'>('todo');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [assignedTo, setAssignedTo] = useState<string>('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    loadUsers();
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
      setAssignedTo(task.assignedTo?._id || '');
      // Format date for HTML input (YYYY-MM-DD)
      setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
    }
  }, [task]);

  const loadUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data.users);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const taskData = {
        title,
        description,
        status,
        priority,
        assignedTo: assignedTo || null,
        dueDate: dueDate || undefined,
      };

      if (task) {
        await taskAPI.updateTask(task._id, taskData);
      } else {
        await taskAPI.createTask(taskData);
      }

      onSave();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000] p-5 md:p-2.5 md:items-start md:pt-5" onClick={onClose}>
      <div className="bg-white rounded-lg w-full max-w-[600px] max-h-[90vh] overflow-y-auto shadow-[0_10px_40px_rgba(0,0,0,0.2)] md:max-w-full md:max-h-[95vh] sm:max-h-[100vh] sm:rounded-t-lg sm:rounded-b-none" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-5 border-b border-[#ddd] md:p-4 sm:p-3">
          <h2 className="m-0 text-[#333] md:text-lg sm:text-base">{task ? 'Edit Task' : 'Create New Task'}</h2>
          <button className="bg-none border-none text-[32px] text-[#999] cursor-pointer leading-none p-0 w-[30px] h-[30px] flex items-center justify-center hover:text-[#333] md:text-[28px] md:w-[28px] md:h-[28px]" onClick={onClose}>
            ×
          </button>
        </div>

        {error && <div className="bg-[#f8d7da] text-[#721c24] p-2.5 mx-5 my-5 rounded border border-[#f5c6cb] md:mx-4 md:my-4 md:p-3 md:text-sm sm:mx-3 sm:my-3 sm:p-2.5 sm:text-[13px]">{error}</div>}

        <form onSubmit={handleSubmit} className="p-5 md:p-4 sm:p-3">
          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#333]">Title *</label>
            <input
              type="text"
              className="w-full p-2.5 border border-[#ddd] rounded text-base focus:outline-none focus:border-[#007bff] focus:shadow-[0_0_0_2px_rgba(0,123,255,0.25)]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={100}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#333]">Description *</label>
            <textarea
              className="w-full p-2.5 border border-[#ddd] rounded text-base focus:outline-none focus:border-[#007bff] focus:shadow-[0_0_0_2px_rgba(0,123,255,0.25)]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              maxLength={500}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-1 md:gap-2.5">
            <div className="mb-4">
              <label className="block mb-1 font-medium text-[#333]">Status</label>
              <select
                className="w-full p-2.5 border border-[#ddd] rounded text-base focus:outline-none focus:border-[#007bff] focus:shadow-[0_0_0_2px_rgba(0,123,255,0.25)]"
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
              >
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-[#333]">Priority</label>
              <select
                className="w-full p-2.5 border border-[#ddd] rounded text-base focus:outline-none focus:border-[#007bff] focus:shadow-[0_0_0_2px_rgba(0,123,255,0.25)]"
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-1 md:gap-2.5">
            <div className="mb-4">
              <label className="block mb-1 font-medium text-[#333]">Assign To</label>
              <select
                className="w-full p-2.5 border border-[#ddd] rounded text-base focus:outline-none focus:border-[#007bff] focus:shadow-[0_0_0_2px_rgba(0,123,255,0.25)]"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              >
                <option value="">Unassigned</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-[#333]">Due Date</label>
              <input
                type="date"
                className="w-full p-2.5 border border-[#ddd] rounded text-base focus:outline-none focus:border-[#007bff] focus:shadow-[0_0_0_2px_rgba(0,123,255,0.25)]"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2.5 justify-end mt-5 md:flex-col-reverse md:gap-2.5 md:mt-4">
            <button 
              type="button" 
              className="px-5 py-2.5 border-none rounded cursor-pointer text-base font-medium bg-[#6c757d] text-white min-w-[100px] hover:bg-[#5a6268] disabled:opacity-60 disabled:cursor-not-allowed md:w-full md:min-w-0 md:p-3"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-5 py-2.5 border-none rounded cursor-pointer text-base font-medium bg-[#007bff] text-white min-w-[100px] hover:bg-[#0056b3] disabled:opacity-60 disabled:cursor-not-allowed md:w-full md:min-w-0 md:p-3" 
              disabled={loading}
            >
              {loading ? 'Saving...' : task ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;

