import React, { useState } from 'react';
import {
    FaTachometerAlt,
    FaUsers,
    FaPlus,
    FaCog,
    FaUserPlus,
    FaEnvelope,
    FaBars,
    FaTimes,
    FaGem
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeItem, setActiveItem] = useState('dashboard');
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt, color: 'from-purple-500 to-indigo-600', hoverColor: 'hover:text-purple-400', to: '/admin/dashboard' },
        { id: 'manage-students', label: 'Manage Students', icon: FaUsers, color: 'from-blue-500 to-cyan-600', hoverColor: 'hover:text-blue-400', to: '/admin/registeredstudentslist' },
        { id: 'add-courses', label: 'Add Courses', icon: FaPlus, color: 'from-emerald-500 to-teal-600', hoverColor: 'hover:text-emerald-400', to: '/admin/add-courses' },
        { id: 'manage-courses', label: 'Manage Courses', icon: FaCog, color: 'from-orange-500 to-red-600', hoverColor: 'hover:text-orange-400', to: '/admin/manage-courses' },
        { id: 'enroll-students', label: 'Enroll Students', icon: FaUserPlus, color: 'from-pink-500 to-rose-600', hoverColor: 'hover:text-pink-400', to: '/admin/enroll-students' },
        { id: 'send-email', label: 'Send Email', icon: FaEnvelope, color: 'from-amber-500 to-yellow-600', hoverColor: 'hover:text-amber-400', to: '/admin/send-email' },
    ];

    return (
        <>
            {/* Mobile Hamburger Button */}
            <button
                className="lg:hidden fixed top-4 left-4 z-50 text-white bg-gradient-to-r from-purple-600 to-indigo-700 p-3 rounded-2xl shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 border border-purple-500/30"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
                {isMobileOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>

            {/* Sidebar Container */}
            <div className={`
                h-full bg-gradient-to-br from-gray-900 via-slate-900 to-black text-slate-100
                transition-all duration-500 ease-in-out flex flex-col shadow-2xl relative 
                border-r border-purple-500/20 backdrop-blur-xl
                ${isCollapsed ? 'w-20' : 'w-72'}
                
                /* Mobile: Fixed positioning with transform */
                fixed top-0 left-0 z-40
                ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
                
                /* Desktop: Static positioning */
                lg:static lg:translate-x-0 lg:z-auto
            `}>

                

                {/* Navigation Menu */}
                <nav className="flex-1 py-8 px-4 space-y-2">
                    <ul className="space-y-2">
                        {menuItems.map((item, index) => {
                            const IconComponent = item.icon;
                            const isActive = activeItem === item.id;

                            return (
                                <li key={item.id} style={{ animationDelay: `${index * 0.1}s` }} className="animate-fade-in">
                                    <Link to={item.to}>
                                        <button
                                            onClick={() => {
                                                setActiveItem(item.id);
                                                setIsMobileOpen(false);
                                            }}
                                            className={`
                                                w-full flex items-center px-4 py-4 rounded-2xl
                                                transition-all duration-300 group relative font-inter
                                                backdrop-blur-sm border border-transparent
                                                ${isActive 
                                                    ? `bg-gradient-to-r ${item.color} text-white shadow-2xl shadow-current/20 border-white/20 transform scale-[1.02]` 
                                                    : `hover:bg-slate-800/60 text-slate-300 ${item.hoverColor} hover:shadow-xl hover:shadow-current/10 hover:border-current/20 hover:scale-[1.01]`
                                                }
                                                ${isCollapsed ? 'justify-center' : 'justify-start'}
                                            `}
                                        >
                                            {/* Icon with glow effect */}
                                            <div className={`relative ${isCollapsed ? '' : 'mr-4'}`}>
                                                <IconComponent 
                                                    className={`
                                                        w-5 h-5 flex-shrink-0 relative z-10
                                                        ${isActive ? 'text-white drop-shadow-lg' : 'text-slate-400 group-hover:text-current'}
                                                        transition-all duration-300
                                                    `}
                                                />
                                                {isActive && (
                                                    <div className="absolute inset-0 bg-current rounded-full blur-sm opacity-30"></div>
                                                )}
                                            </div>

                                            {!isCollapsed && (
                                                <span className="font-semibold tracking-wide text-sm font-poppins flex-1 text-left">
                                                    {item.label}
                                                </span>
                                            )}

                                            {/* Active indicator */}
                                            {isActive && !isCollapsed && (
                                                <div className="w-2 h-2 bg-white rounded-full shadow-lg"></div>
                                            )}

                                            {/* Enhanced Tooltip for collapsed state */}
                                            {isCollapsed && (
                                                <div className="
                                                    absolute left-full ml-4 px-4 py-3
                                                    bg-gradient-to-r from-slate-800 to-slate-700 text-slate-100 text-sm rounded-2xl
                                                    opacity-0 invisible group-hover:opacity-100 group-hover:visible
                                                    transition-all duration-300 whitespace-nowrap z-50
                                                    shadow-2xl border border-slate-600/50 font-inter backdrop-blur-md
                                                    before:content-[''] before:absolute before:right-full before:top-1/2 
                                                    before:-translate-y-1/2 before:border-8 before:border-transparent 
                                                    before:border-r-slate-700
                                                    hidden lg:block
                                                ">
                                                    <span className="font-semibold">{item.label}</span>
                                                </div>
                                            )}
                                        </button>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                

                {/* Decorative Bottom Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent pointer-events-none"></div>
            </div>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-gradient-to-br from-black/60 via-purple-900/20 to-black/60 z-30 lg:hidden backdrop-blur-md"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateX(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }
            `}</style>
        </>
    );
};

export default AdminSidebar;
