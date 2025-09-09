import React, { useState } from 'react';
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaPlus, 
  FaCog, 
  FaUserPlus, 
  FaEnvelope,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt },
    { id: 'manage-students', label: 'Manage Students', icon: FaUsers },
    { id: 'add-courses', label: 'Add Courses', icon: FaPlus },
    { id: 'manage-courses', label: 'Manage Courses', icon: FaCog },
    { id: 'enroll-students', label: 'Enroll Students', icon: FaUserPlus },
    { id: 'send-email', label: 'Send Email', icon: FaEnvelope }
  ];

  return (
    <>
      {/* Hamburger Button for Mobile */}
      <button
        className="lg:hidden fixed top-1.5 left-4 z-50 text-white bg-none p-3 rounded-xl shadow-lg hover:bg-emerald-700 transition-colors duration-200"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar Container */}
      <div className={`
        -mt-14 h-screen bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 text-slate-200 
        transition-all duration-300 ease-in-out flex flex-col shadow-2xl relative border-r border-slate-700/50
        ${isCollapsed ? 'w-20' : 'w-64'}
        
        /* Desktop styles */
        lg:static lg:translate-x-0
        
        /* Mobile styles */
        fixed top-0 left-0 z-40
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Navigation Menu */}
       
        <nav className="flex-1 py-6 px-4 mt-10">
          <ul className="space-y-3">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeItem === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveItem(item.id);
                      // Close mobile menu when item is selected
                      setIsMobileOpen(false);
                    }}
                    className={`
                      w-full flex items-center px-4 py-3.5 rounded-2xl
                      transition-all duration-300 group relative font-inter
                      ${isActive 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-500/25 transform scale-[1.02]' 
                        : 'hover:bg-slate-800/70 text-slate-300 hover:text-emerald-400 hover:shadow-lg'
                      }
                      ${isCollapsed ? 'justify-center' : 'justify-start'}
                    `}
                  >
                    <IconComponent 
                      className={`
                        w-5 h-5 flex-shrink-0
                        ${isActive ? 'text-white drop-shadow-sm' : 'text-slate-400 group-hover:text-emerald-400'}
                        transition-all duration-300
                      `}
                    />
                    
                    {!isCollapsed && (
                      <span className="ml-4 font-semibold tracking-wide text-sm font-poppins">
                        {item.label}
                      </span>
                    )}
                    
                    {/* Tooltip for collapsed state - hidden on mobile */}
                    {isCollapsed && (
                      <div className="
                        absolute left-full ml-3 px-3 py-2 
                        bg-slate-800 text-slate-200 text-sm rounded-xl
                        opacity-0 invisible group-hover:opacity-100 group-hover:visible
                        transition-all duration-300 whitespace-nowrap z-50
                        shadow-xl border border-slate-600/50 font-inter
                        before:content-[''] before:absolute before:right-full before:top-1/2 
                        before:-translate-y-1/2 before:border-4 before:border-transparent 
                        before:border-r-slate-800
                        hidden lg:block
                      ">
                        {item.label}
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop Collapse Toggle */}
        <div className="hidden lg:block p-4 border-t border-slate-700/50">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-xl hover:bg-slate-800/70 transition-colors duration-200"
          >
            {isCollapsed ? (
              <FaBars className="w-4 h-4 text-slate-400" />
            ) : (
              <span className="text-xs text-slate-400 font-inter">Collapse</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;
