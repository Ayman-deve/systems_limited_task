import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="page-container">
      <div className="section-header">
        <h2>Settings</h2>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h3>Account Information</h3>
          <div className="settings-item">
            <label>Name:</label>
            <span>{user?.name}</span>
          </div>
          <div className="settings-item">
            <label>Email:</label>
            <span>{user?.email}</span>
          </div>
          <div className="settings-item">
            <label>Role:</label>
            <span className="role-badge">{user?.role}</span>
          </div>
        </div>

        <div className="settings-section">
          <h3>Actions</h3>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

