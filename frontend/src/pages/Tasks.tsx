import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import * as taskAPI from '../api/tasks';
import TaskTable from '../components/TaskTable';
import TaskModal from '../components/TaskModal';

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
    <div className="page-container">
      <div className="section-header">
        <h2>Tasks</h2>
        <button className="btn-add-task" onClick={handleCreateTask}>
          <span className="btn-icon">+</span> Add Task
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading tasks...</div>
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

