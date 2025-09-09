import React, { useState } from 'react';
import { 
  FaTachometerAlt, 
  FaBookOpen, 
  FaClipboardList, 
  FaRegCalendarCheck, 
  FaUserGraduate, 
  FaEnvelope, 
  FaBars, 
  FaTimes 
} from 'react-icons/fa';

const StudentSideNavbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt },
    { id: 'my-courses', label: 'My Courses', icon: FaBookOpen },
    { id: 'assignments', label: 'Assignments', icon: FaClipboardList },
    { id: 'attendance', label: 'Attendance', icon: FaRegCalendarCheck },
    { id: 'profile', label: 'Profile', icon: FaUserGraduate },
    { id: 'messages', label: 'Messages', icon: FaEnvelope },
  ];

  return (
    <>
      {/* Hamburger Button for Mobile */}
      <button
        className="lg:hidden fixed top-1.5 left-4 z-50 text-gray-800 p-3 rounded-xl shadow-lg hover:bg-gray-200 transition-colors duration-200"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar Container */}
      <div className={`
        -mt-14 h-screen bg-gradient-to-b from-white via-gray-100 to-gray-200 text-gray-800
        transition-all duration-300 ease-in-out flex flex-col shadow-lg relative border-r border-gray-300
        ${isCollapsed ? 'w-20' : 'w-64'}

        /* Desktop styles */
        lg:static lg:translate-x-0

        /* Mobile styles */
        fixed top-0 left-0 z-40
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Sidebar Header */}
        <div className={`px-4 py-5 `}>
          <h1 className="text-xl font-bold text-blue-600 tracking-wide">
            Student Panel
          </h1>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-6 px-4">
          <ul className="space-y-3">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeItem === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveItem(item.id);
                      setIsMobileOpen(false); // Close on mobile
                    }}
                    className={`
                      w-full flex items-center px-4 py-3.5 rounded-2xl
                      transition-all duration-300 group relative font-inter
                      ${isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-xl transform scale-[1.02]' 
                        : 'hover:bg-gray-300/50 text-gray-700 hover:text-blue-600'
                      }
                      ${isCollapsed ? 'justify-center' : 'justify-start'}
                    `}
                  >
                    <IconComponent 
                      className={`
                        w-5 h-5 flex-shrink-0
                        ${isActive ? 'text-white drop-shadow-sm' : 'text-gray-500 group-hover:text-blue-600'}
                        transition-all duration-300
                      `}
                    />
                    
                    {!isCollapsed && (
                      <span className="ml-4 font-semibold tracking-wide text-sm font-poppins">
                        {item.label}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop Collapse Toggle
        <div className="hidden lg:block p-4 border-t border-gray-300">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-xl hover:bg-gray-300/50 transition-colors duration-200"
          >
            {isCollapsed ? (
              <FaBars className="w-4 h-4 text-gray-500" />
            ) : (
              <span className="text-xs text-gray-600 font-inter">Collapse</span>
            )}
          </button>
        </div> */}
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default StudentSideNavbar;
