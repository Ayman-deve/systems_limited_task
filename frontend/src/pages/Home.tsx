import React from 'react';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="w-full">
      <div className="md:py-5 py-2.5">
        <h1 className="md:text-[32px] md:font-bold md:text-black md:mb-2.5 text-2xl mb-2 sm:text-xl">Welcome back, {user?.name}!</h1>
        <p className="md:text-base md:text-[#666] md:mb-10 text-sm mb-7 sm:text-[13px] sm:mb-5">Manage your team's tasks efficiently and collaboratively.</p>
        
        <div className="md:grid md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:gap-5 md:mt-7 grid-cols-1 gap-3.5 mt-5 sm:gap-3">
          <div className="bg-white border border-[#e0e0e0] rounded-lg md:p-6 p-5 shadow-sm transition-shadow hover:shadow-md sm:p-4">
            <h3 className="md:text-lg md:font-semibold md:text-[#333] md:mb-2 text-base sm:text-base">📋 Tasks</h3>
            <p className="md:text-sm md:text-[#666] md:m-0 text-[13px] sm:text-[13px]">Navigate to Tasks to start managing your workload</p>
          </div>
          <div className="bg-white border border-[#e0e0e0] rounded-lg md:p-6 p-5 shadow-sm transition-shadow hover:shadow-md sm:p-4">
            <h3 className="md:text-lg md:font-semibold md:text-[#333] md:mb-2 text-base sm:text-base">👥 Team Members</h3>
            <p className="md:text-sm md:text-[#666] md:m-0 text-[13px] sm:text-[13px]">View and manage team members in the Users section</p>
          </div>
          <div className="bg-white border border-[#e0e0e0] rounded-lg md:p-6 p-5 shadow-sm transition-shadow hover:shadow-md sm:p-4">
            <h3 className="md:text-lg md:font-semibold md:text-[#333] md:mb-2 text-base sm:text-base">⚙️ Settings</h3>
            <p className="md:text-sm md:text-[#666] md:m-0 text-[13px] sm:text-[13px]">Configure your account and preferences in Settings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

