import React, { useState } from "react";
import { FaUserCircle, FaChevronDown, FaSignOutAlt, FaCog, FaUser, FaBell } from "react-icons/fa";
import { useauth } from "../../context/AppContext";

const StudentNavbar = () => {
  const { user,setUser } = useauth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
   try {
      await axios.get(`${api_url}/auth/studentlogout`, {}, { withCredentials: true });
      setUser(null); // clear user from context
      navigate("/");  // redirect to login page
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="h-14 w-full bg-white border-b border-slate-700/50 flex items-center justify-end px-6 shadow-2xl">
      
      {/* Right Section - Profile */}
      <div className="flex items-center space-x-4">
        
        {/* Profile Section */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-3 p-2 bg-gray-300 rounded-xl hover:bg-slate-800/70 transition-all duration-300 group"
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              {user?.avatar ? (
                <img
                  src={user?.avatar}
                  alt="User Avatar"
                  className="w-9 h-9 rounded-full border-2 border-slate-600/50 object-cover shadow-sm group-hover:border-emerald-500/50 transition-all duration-300"
                />
              ) : (
                <FaUserCircle className="w-9 h-9 text-slate-400 group-hover:text-emerald-400 transition-colors duration-300" />
              )}
            </div>

            {/* Profile Info */}
            <div className="text-left hidden sm:block">
              <p className="text-sm font-semibold text-black leading-none font-inter">
                {user?.name || "User"}
              </p>
              {/* <p className="text-xs text-slate-400 leading-none mt-0.5 font-inter">
                System Useristrator
              </p> */}
            </div>

            {/* Dropdown Arrow */}
            <FaChevronDown 
              className={`w-3 h-3 text-slate-400 transition-all duration-300 group-hover:text-emerald-400 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-slate-800/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-600/50 py-2 z-50">
              
              {/* Profile Header */}
              <div className="px-4 py-3 border-b border-slate-700/50">
                <p className="text-sm font-semibold text-slate-200 font-poppins">{user?.name}</p>
                <p className="text-xs text-slate-400 font-inter">{user?.email}</p>
              </div>
              
              {/* Menu Items */}
              <div className="py-2">
                <button className="w-full flex items-center px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-emerald-400 transition-all duration-300 font-inter">
                  <FaUser className="w-4 h-4 mr-3" />
                  View Profile
                </button>
                
                <button className="w-full flex items-center px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-emerald-400 transition-all duration-300 font-inter">
                  <FaCog className="w-4 h-4 mr-3" />
                  Account Settings
                </button>
              </div>
              
              <hr className="my-2 border-slate-700/50" />
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2.5 text-sm text-red-400 hover:bg-red-900/20 transition-all duration-300 font-inter"
              >
                <FaSignOutAlt className="w-4 h-4 mr-3" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop for dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </header>
  );
};

export default StudentNavbar;
