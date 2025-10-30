import React from 'react';
import { useAuth } from '../context/AuthContext';

const Settings: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-5 flex-wrap gap-2.5 md:flex-col md:items-start">
        <h2 className="text-xl font-bold text-black md:text-lg sm:text-base">Settings</h2>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm md:p-5 sm:p-4">
        <div className="mb-8 md:mb-6">
          <h3 className="text-lg font-semibold text-[#333] mb-4 md:text-base md:mb-3 sm:text-[15px]">Account Information</h3>
          <div className="flex items-center py-3 border-b border-[#f0f0f0] md:items-start md:py-3 md:gap-1.5">
            <label className="font-medium text-[#333] min-w-[100px] md:text-sm">Name:</label>
            <span className="text-[#666] md:text-sm sm:text-[13px]">{user?.name}</span>
          </div>
          <div className="flex items-center py-3 border-b border-[#f0f0f0] md:items-start md:py-3 md:gap-1.5">
            <label className="font-medium text-[#333] min-w-[100px] md:text-sm">Email:</label>
            <span className="text-[#666] md:text-sm sm:text-[13px] break-words">{user?.email}</span>
          </div>
          <div className="flex items-center py-3 md:items-start md:py-3 md:gap-1.5">
            <label className="font-medium text-[#333] min-w-[100px] md:text-sm">Role:</label>
            <span className="text-[#666] md:text-sm sm:text-[13px]">{user?.role}</span>
          </div>
        </div>

        {/* Actions section removed: Logout moved to sidebar */}
      </div>
    </div>
  );
};

export default Settings;

