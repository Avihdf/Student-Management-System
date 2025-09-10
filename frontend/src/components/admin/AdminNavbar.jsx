import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import { 
  FaChevronDown, 
  FaSignOutAlt, 
  FaCog, 
  FaUser, 
  FaBars, 
  FaTimes,
  FaTachometerAlt,
  FaUsers,
  FaPlus,
  FaUserPlus,
  FaEnvelope,
  FaGem
} from "react-icons/fa";
import { useauth } from "../../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const api_url = import.meta.env.VITE_API_URL;

const AdminNavbar = () => {
    const { admin, setAdmin } = useauth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [avatarError, setAvatarError] = useState(false);
    const [avatarLoaded, setAvatarLoaded] = useState(false);

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt, color: 'from-purple-500 to-indigo-600', to: '/admin/dashboard' },
        { id: 'manage-students', label: 'Manage Students', icon: FaUsers, color: 'from-blue-500 to-cyan-600', to: '/admin/registeredstudentslist' },
        { id: 'add-courses', label: 'Add Courses', icon: FaPlus, color: 'from-emerald-500 to-teal-600', to: '/admin/add-courses' },
        { id: 'manage-courses', label: 'Manage Courses', icon: FaCog, color: 'from-orange-500 to-red-600', to: '/admin/manage-courses' },
        { id: 'enroll-students', label: 'Enroll Students', icon: FaUserPlus, color: 'from-pink-500 to-rose-600', to: '/admin/enroll-students' },
        { id: 'send-email', label: 'Send Email', icon: FaEnvelope, color: 'from-amber-500 to-yellow-600', to: '/admin/send-email' },
    ];

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = async () => {
        try {
            await axios.get(`${api_url}/auth/adminlogout`, {}, { withCredentials: true });
            setAdmin(null);
            navigate("/");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    const handleImageError = () => {
        setAvatarError(true);
        setAvatarLoaded(false);
    };

    const handleImageLoad = () => {
        setAvatarError(false);
        setAvatarLoaded(true);
    };

    useEffect(() => {
        setAvatarError(false);
        setAvatarLoaded(false);
    }, [admin?.avatar]);

    const getProcessedAvatarUrl = (url) => {
        if (!url) return null;
        if (url.includes('googleusercontent.com')) {
            const baseUrl = url.split('=')[0];
            return `${baseUrl}=s96-c`;
        }
        return url;
    };

    const processedAvatarUrl = getProcessedAvatarUrl(admin?.avatar);

    const isActiveRoute = (to) => location.pathname === to;

    return (
        <>
            {/* Top Navbar */}
            <header className="h-14 w-full bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950 border-b border-slate-700/50 flex items-center justify-between px-4 lg:px-6 shadow-2xl relative z-50">
                
                {/* Left Section - Hamburger + Logo */}
                <div className="flex items-center space-x-4">
                    {/* Mobile Hamburger */}
                    <button
                        className="lg:hidden text-white p-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 transition-all duration-300 shadow-lg"
                        onClick={toggleMobileMenu}
                    >
                        {isMobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
                    </button>

                    {/* Desktop Logo/Brand */}
                    <div className="hidden lg:flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                            <FaGem className="text-white w-4 h-4" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                                Admin Panel
                            </h1>
                        </div>
                    </div>

                    {/* Desktop Navigation Menu */}
                    <nav className="hidden lg:flex items-center space-x-1 ml-8">
                        {menuItems.map((item) => {
                            const IconComponent = item.icon;
                            const isActive = isActiveRoute(item.to);
                            
                            return (
                                <Link key={item.id} to={item.to}>
                                    <button
                                        className={`
                                            flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group
                                            ${isActive 
                                                ? `bg-gradient-to-r ${item.color} text-white shadow-lg shadow-current/25` 
                                                : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                                            }
                                        `}
                                    >
                                        <IconComponent className="w-4 h-4 mr-2" />
                                        <span className="hidden xl:block">{item.label}</span>
                                    </button>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Right Section - Profile */}
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center space-x-3 p-2 rounded-xl hover:bg-slate-800/70 transition-all duration-300 group"
                        >
                            {/* Avatar */}
                            <div className="flex-shrink-0 relative">
                                {processedAvatarUrl && !avatarError ? (
                                    <>
                                        <img
                                            src={processedAvatarUrl}
                                            alt="Admin Avatar"
                                            className={`w-8 h-8 rounded-full border-2 border-slate-600/50 object-cover shadow-sm group-hover:border-emerald-500/50 transition-all duration-300 ${
                                                avatarLoaded ? 'opacity-100' : 'opacity-0'
                                            }`}
                                            onError={handleImageError}
                                            onLoad={handleImageLoad}
                                            crossOrigin="anonymous"
                                            referrerPolicy="no-referrer"
                                        />
                                        {!avatarLoaded && (
                                            <div className="absolute inset-0 w-8 h-8 rounded-full bg-gray-400 animate-pulse border-2 border-slate-600/50"></div>
                                        )}
                                    </>
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center border-2 border-slate-600/50 group-hover:border-emerald-500/50 transition-all duration-300">
                                        <FaUser className="w-3 h-3 text-white" />
                                    </div>
                                )}
                            </div>

                            {/* Profile Info - Hidden on small screens */}
                            <div className="text-left hidden sm:block">
                                <p className="text-sm font-semibold text-slate-200 leading-none">
                                    {admin?.name || "Admin"}
                                </p>
                                <p className="text-xs text-slate-400 leading-none mt-0.5">
                                    Administrator
                                </p>
                            </div>

                            {/* Dropdown Arrow */}
                            <FaChevronDown
                                className={`w-3 h-3 text-slate-400 transition-all duration-300 group-hover:text-emerald-400 ${
                                    isDropdownOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </button>

                        {/* Profile Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-slate-800/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-600/50 py-2 z-50">
                                <div className="px-4 py-3 border-b border-slate-700/50">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            {processedAvatarUrl && !avatarError ? (
                                                <img
                                                    src={processedAvatarUrl}
                                                    alt="Admin Avatar"
                                                    className="w-12 h-12 rounded-full border-2 border-emerald-500/50 object-cover shadow-lg"
                                                    crossOrigin="anonymous"
                                                    referrerPolicy="no-referrer"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center border-2 border-emerald-500/50 shadow-lg">
                                                    <FaUser className="w-6 h-6 text-white" />
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-slate-200 truncate">
                                                {admin?.name || "Admin User"}
                                            </p>
                                            <p className="text-xs text-slate-400 truncate">
                                                {admin?.email || "admin@example.com"}
                                            </p>
                                            <p className="text-xs text-emerald-400 mt-0.5">
                                                System Administrator
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="py-2">
                                    <button className="w-full flex items-center px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-emerald-400 transition-all duration-300">
                                        <FaUser className="w-4 h-4 mr-3" />
                                        View Profile
                                    </button>
                                    <button className="w-full flex items-center px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-emerald-400 transition-all duration-300">
                                        <FaCog className="w-4 h-4 mr-3" />
                                        Admin Settings
                                    </button>
                                </div>

                                <hr className="my-2 border-slate-700/50" />

                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center px-4 py-2.5 text-sm text-red-400 hover:bg-red-900/20 transition-all duration-300"
                                >
                                    <FaSignOutAlt className="w-4 h-4 mr-3" />
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Mobile Sidebar Menu */}
            <div className={`
                lg:hidden fixed inset-0 z-40 transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleMobileMenu} />
                <div className="fixed top-14 left-0 bottom-0 w-72 bg-gradient-to-br from-gray-900 via-slate-900 to-black text-slate-100 shadow-2xl overflow-y-auto">
                    
                    {/* Mobile Menu Header */}
                    <div className="p-6 border-b border-slate-700/50">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                                <FaGem className="text-white w-5 h-5" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                                    Admin Panel
                                </h1>
                                <p className="text-xs text-slate-400">Management Dashboard</p>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Items */}
                    <nav className="p-4 space-y-2">
                        {menuItems.map((item) => {
                            const IconComponent = item.icon;
                            const isActive = isActiveRoute(item.to);
                            
                            return (
                                <Link key={item.id} to={item.to} onClick={toggleMobileMenu}>
                                    <button
                                        className={`
                                            w-full flex items-center px-4 py-4 rounded-2xl text-left
                                            transition-all duration-300 group relative
                                            ${isActive 
                                                ? `bg-gradient-to-r ${item.color} text-white shadow-xl shadow-current/20` 
                                                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                                            }
                                        `}
                                    >
                                        <IconComponent className="w-5 h-5 mr-4 flex-shrink-0" />
                                        <span className="font-semibold text-sm">{item.label}</span>
                                        {isActive && (
                                            <div className="w-2 h-2 bg-white rounded-full shadow-lg ml-auto"></div>
                                        )}
                                    </button>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Close dropdowns when clicking outside */}
            {isDropdownOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDropdownOpen(false)}
                />
            )}
        </>
    );
};

export default AdminNavbar;
