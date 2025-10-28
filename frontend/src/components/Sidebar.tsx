import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = () => {
    if (location.pathname === '/' || location.pathname === '/dashboard') return 'dashboard';
    if (location.pathname === '/tasks') return 'tasks';
    if (location.pathname === '/users') return 'users';
    if (location.pathname === '/settings') return 'settings';
    return '';
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { id: 'tasks', label: 'Tasks', path: '/tasks', icon: '📋' },
    { id: 'users', label: 'Users', path: '/users', icon: '👥' },
    { id: 'settings', label: 'Settings', path: '/settings', icon: '⚙️' },
  ];

  const activeTab = getActiveTab();

  return (
    <aside className="sidebar">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
          onClick={() => handleNavigation(item.path)}
        >
          <span className="sidebar-icon">{item.icon}</span>
          <span className="sidebar-label">{item.label}</span>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
