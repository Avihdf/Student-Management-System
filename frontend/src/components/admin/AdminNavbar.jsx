import React, { useState, useEffect } from "react";
import { FaChevronDown, FaSignOutAlt, FaCog, FaUser } from "react-icons/fa";
import { useauth } from "../../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const api_url = import.meta.env.VITE_API_URL;

const AdminNavbar = () => {
    const { admin, setAdmin } = useauth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const [avatarError, setAvatarError] = useState(false);
    const [avatarLoaded, setAvatarLoaded] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
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

    // Handle image load error
    const handleImageError = () => {
        console.log("Avatar failed to load:", admin?.avatar);
        setAvatarError(true);
        setAvatarLoaded(false);
    };

    // Handle image load success
    const handleImageLoad = () => {
        console.log("Avatar loaded successfully:", admin?.avatar);
        setAvatarError(false);
        setAvatarLoaded(true);
    };

    // Reset error state when admin changes
    useEffect(() => {
        setAvatarError(false);
        setAvatarLoaded(false);
        console.log("Admin changed:", admin);
    }, [admin?.avatar]);

    // Process the Google avatar URL to ensure it's accessible
    const getProcessedAvatarUrl = (url) => {
        if (!url) return null;

        // For Google profile images, ensure we're using the right size parameter
        if (url.includes('googleusercontent.com')) {
            const baseUrl = url.split('=')[0];
            return `${baseUrl}=s96-c`;
        }

        return url;
    };

    const processedAvatarUrl = getProcessedAvatarUrl(admin?.avatar);

    return (
        <header className="h-14 w-full bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border-b border-slate-700/50 flex items-center justify-between px-6 shadow-2xl">
            {/* Left Section - Title */}
            <div className="flex items-center space-x-3">
                <h1 className="text-lg font-semibold text-slate-200 font-poppins">Admin Panel</h1>
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
                                        className={`w-9 h-9 rounded-full border-2 border-slate-600/50 object-cover shadow-sm group-hover:border-emerald-500/50 transition-all duration-300 ${
                                            avatarLoaded ? 'opacity-100' : 'opacity-0'
                                        }`}
                                        onError={handleImageError}
                                        onLoad={handleImageLoad}
                                        crossOrigin="anonymous"
                                        referrerPolicy="no-referrer"
                                    />
                                    {!avatarLoaded && (
                                        <div className="absolute inset-0 w-9 h-9 rounded-full bg-gray-400 animate-pulse border-2 border-slate-600/50"></div>
                                    )}
                                </>
                            ) : (
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center border-2 border-slate-600/50 group-hover:border-emerald-500/50 transition-all duration-300">
                                    <FaUser className="w-4 h-4 text-white" />
                                </div>
                            )}
                        </div>

                        {/* Profile Info */}
                        <div className="text-left hidden sm:block">
                            <p className="text-sm font-semibold text-slate-200 leading-none font-inter">
                                {admin?.name || "Admin"}
                            </p>
                            <p className="text-xs text-slate-400 leading-none mt-0.5 font-inter">
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

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-slate-800/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-600/50 py-2 z-50">
                            {/* Profile Header */}
                            <div className="px-4 py-3 border-b border-slate-700/50">
                                <div className="flex items-center space-x-3">
                                    {/* Avatar in dropdown - larger version */}
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
                                        <p className="text-sm font-semibold text-slate-200 font-poppins truncate">
                                            {admin?.name || "Admin User"}
                                        </p>
                                        <p className="text-xs text-slate-400 font-inter truncate">
                                            {admin?.email || "admin@example.com"}
                                        </p>
                                        <p className="text-xs text-emerald-400 font-inter mt-0.5">
                                            System Administrator
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="py-2">
                                <button className="w-full flex items-center px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-emerald-400 transition-all duration-300 font-inter">
                                    <FaUser className="w-4 h-4 mr-3" />
                                    View Profile
                                </button>

                                <button className="w-full flex items-center px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-emerald-400 transition-all duration-300 font-inter">
                                    <FaCog className="w-4 h-4 mr-3" />
                                    Admin Settings
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

export default AdminNavbar;
