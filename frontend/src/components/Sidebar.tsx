import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, Users, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const getActiveTab = () => {
    if (location.pathname === '/' || location.pathname === '/dashboard') return 'dashboard';
    if (location.pathname === '/tasks') return 'tasks';
    if (location.pathname === '/users') return 'users';
    if (location.pathname === '/settings') return 'settings';
    return '';
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose(); // Close sidebar on mobile after navigation
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tasks', path: '/tasks', icon: ClipboardList },
    { id: 'users', label: 'Users', path: '/users', icon: Users },
    { id: 'settings', label: 'Settings', path: '/settings', icon: Settings },
  ];

  const activeTab = getActiveTab();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-[999] transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>
      <aside className={`pt-16 md:pt-5 fixed left-0 top-0 w-[300px] h-screen bg-gradient-to-b from-[#0F172A] to-[#0F172A] py-5 flex flex-col gap-[5px] z-[1000] transition-transform duration-300 md:w-[250px] md:translate-x-0 ${isOpen ? '' : '-translate-x-full'}`}>
        <div className="flex justify-center px-5 pb-4">
          <button
            type="button"
            onClick={() => handleNavigation('/dashboard')}
            className="flex items-center"
            aria-label="Go to dashboard"
          >
            <img
              src="/assets/systems_logo.png"
              alt="Systems logo"
              className="h-8 w-auto self-center"
            />
          </button>
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`flex items-center px-5 py-3 cursor-pointer transition-colors text-white hover:bg-white/10 ${activeTab === item.id ? 'bg-white/20' : ''}`}
              onClick={() => handleNavigation(item.path)}
            >
              <Icon className="mr-2.5 text-lg" size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          );
        })}
        <div className="mt-auto pt-2">
          <button
            type="button"
            onClick={() => { logout(); navigate('/login'); }}
            className="w-full flex items-center px-5 py-3 text-left text-white hover:bg-white/10"
          >
            <LogOut className="mr-2.5" size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
