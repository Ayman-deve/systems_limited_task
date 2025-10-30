import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import * as taskAPI from '../api/tasks';
import TaskTable from '../components/TaskTable';
import TaskModal from '../components/TaskModal';
import { Plus } from 'lucide-react';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getAllTasks();
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.deleteTask(taskId);
        loadTasks();
      } catch (error) {
        console.error('Failed to delete task:', error);
        alert('Failed to delete task');
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleTaskSave = () => {
    loadTasks();
    handleModalClose();
  };

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center mb-5 flex-wrap gap-2.5 md:items-start">
        <h2 className="text-xl font-bold text-black md:text-lg sm:text-base">Tasks</h2>
        <button 
          className="flex items-center px-5 py-2.5 bg-[#1976d2] text-white border-none rounded-md text-sm font-medium cursor-pointer transition-colors hover:bg-[#1565c0] whitespace-nowrap md:justify-center md:px-5 md:py-3 md:text-base"
          onClick={handleCreateTask}
        >
          <Plus size={20} className="mr-2" /> Add Task
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-base text-[#666]">Loading tasks...</div>
      ) : (
        <TaskTable
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      )}

      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onClose={handleModalClose}
          onSave={handleTaskSave}
        />
      )}
    </div>
  );
};

export default Tasks;

