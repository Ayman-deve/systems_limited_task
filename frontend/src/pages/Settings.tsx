import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-5 flex-wrap gap-2.5 md:flex-col md:items-start">
        <h2 className="text-xl font-bold text-black md:text-lg sm:text-base">Settings</h2>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm md:p-5 sm:p-4">
        <div className="mb-8 md:mb-6">
          <h3 className="text-lg font-semibold text-[#333] mb-4 md:text-base md:mb-3 sm:text-[15px]">Account Information</h3>
          <div className="flex items-center py-3 border-b border-[#f0f0f0] md:flex-col md:items-start md:py-3 md:gap-1.5">
            <label className="font-medium text-[#333] min-w-[100px] md:min-w-0 md:text-sm">Name:</label>
            <span className="text-[#666] md:text-sm sm:text-[13px]">{user?.name}</span>
          </div>
          <div className="flex items-center py-3 border-b border-[#f0f0f0] md:flex-col md:items-start md:py-3 md:gap-1.5">
            <label className="font-medium text-[#333] min-w-[100px] md:min-w-0 md:text-sm">Email:</label>
            <span className="text-[#666] md:text-sm sm:text-[13px] break-words">{user?.email}</span>
          </div>
          <div className="flex items-center py-3 md:flex-col md:items-start md:py-3 md:gap-1.5">
            <label className="font-medium text-[#333] min-w-[100px] md:min-w-0 md:text-sm">Role:</label>
            <span className="text-[#666] md:text-sm sm:text-[13px]">{user?.role}</span>
          </div>
        </div>

        <div className="mb-0 md:mb-0">
          <h3 className="text-lg font-semibold text-[#333] mb-4 md:text-base md:mb-3 sm:text-[15px]">Actions</h3>
          <button 
            className="px-5 py-2.5 bg-[#dc3545] text-white border-none rounded cursor-pointer text-base font-medium hover:bg-[#c82333] md:w-full md:p-3"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

