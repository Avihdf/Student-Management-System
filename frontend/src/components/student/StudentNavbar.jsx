import React, { useState, useEffect } from "react";
import { FaUserCircle, FaChevronDown, FaSignOutAlt, FaCog, FaUser, FaBell } from "react-icons/fa";
import { useauth } from "../../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const api_url = import.meta.env.VITE_API_URL;

const StudentNavbar = () => {
    const navigate = useNavigate();
    const { user, setUser } = useauth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [avatarError, setAvatarError] = useState(false);
    const [avatarLoaded, setAvatarLoaded] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = async () => {
        try {
            await axios.get(`${api_url}/auth/studentlogout`, {}, { withCredentials: true });
            setUser(null);
            navigate("/");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    // Handle image load error
    const handleImageError = () => {
        setAvatarError(true);
        setAvatarLoaded(false);
    };

    // Handle image load success
    const handleImageLoad = () => {
        setAvatarError(false);
        setAvatarLoaded(true);
    };

    // Reset error state when user changes
    useEffect(() => {
        setAvatarError(false);
        setAvatarLoaded(false);
    }, [user?.avatar]);

    // Process the Google avatar URL to ensure it's accessible
    const getProcessedAvatarUrl = (url) => {
        if (!url) return null;
        
        // For Google profile images, ensure we're using the right size parameter
        if (url.includes('googleusercontent.com')) {
            // Remove existing size parameter and add a reliable one
            const baseUrl = url.split('=')[0];
            return `${baseUrl}=s96-c`;
        }
        
        return url;
    };

    const processedAvatarUrl = getProcessedAvatarUrl(user?.avatar);

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
                        <div className="flex-shrink-0 relative">
                            {processedAvatarUrl && !avatarError ? (
                                <>
                                    <img
                                        src={processedAvatarUrl}
                                        alt="User Avatar"
                                        className={`w-9 h-9 rounded-full border-2 border-slate-600/50 object-cover shadow-sm group-hover:border-emerald-500/50 transition-all duration-300 ${
                                            avatarLoaded ? 'opacity-100' : 'opacity-0'
                                        }`}
                                        onError={handleImageError}
                                        onLoad={handleImageLoad}
                                        crossOrigin="anonymous"
                                        referrerPolicy="no-referrer"
                                    />
                                    {!avatarLoaded && (
                                        <div className="absolute inset-0 w-9 h-9 rounded-full bg-gray-400 animate-pulse"></div>
                                    )}
                                </>
                            ) : (
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-slate-600/50 group-hover:border-emerald-500/50 transition-all duration-300">
                                    <FaUser className="w-4 h-4 text-white" />
                                </div>
                            )}
                        </div>

                        {/* Profile Info */}
                        <div className="text-left hidden sm:block">
                            <p className="text-sm font-semibold text-black leading-none font-inter">
                                {user?.name || "User"}
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
                        <div className="absolute right-0 mt-2 w-56 bg-slate-800/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-600/50 py-2 z-50">
                            {/* Profile Header */}
                            <div className="px-4 py-3 border-b border-slate-700/50">
                                <div className="flex items-center space-x-3 mb-2">
                                    {/* Avatar in dropdown */}
                                    <div className="flex-shrink-0">
                                        {processedAvatarUrl && !avatarError ? (
                                            <img
                                                src={processedAvatarUrl}
                                                alt="User Avatar"
                                                className="w-10 h-10 rounded-full border-2 border-emerald-500/50 object-cover"
                                                crossOrigin="anonymous"
                                                referrerPolicy="no-referrer"
                                                onError={() => setAvatarError(true)}
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-emerald-500/50">
                                                <FaUser className="w-5 h-5 text-white" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-200 font-poppins">{user?.name}</p>
                                        <p className="text-xs text-slate-400 font-inter">{user?.email}</p>
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
