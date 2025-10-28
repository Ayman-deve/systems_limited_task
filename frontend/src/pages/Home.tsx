import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <div className="welcome-section">
        <h1>Welcome back, {user?.name}!</h1>
        <p>Manage your team's tasks efficiently and collaboratively.</p>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h3>📋 Tasks</h3>
            <p>Navigate to Tasks to start managing your workload</p>
          </div>
          <div className="stat-card">
            <h3>👥 Team Members</h3>
            <p>View and manage team members in the Users section</p>
          </div>
          <div className="stat-card">
            <h3>⚙️ Settings</h3>
            <p>Configure your account and preferences in Settings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

