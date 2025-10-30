import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, X } from 'lucide-react';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white relative">
      <button 
        className={`md:hidden fixed top-[15px] left-[15px] z-[1001] transition-transform duration-300 bg-[#1976d2] text-white border-none rounded-md p-[10px_12px] cursor-pointer shadow-md hover:bg-[#1565c0] ${sidebarOpen ? 'left-[300px]' : ''}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle menu"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="md:ml-[250px] md:flex-1 md:p-[20px_40px] md:w-[calc(100%-200px)] ml-0 w-full p-[60px_15px_20px] sm:p-[60px_10px_20px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

