import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    FaSearch,
    FaTrash,
    FaBan,
    FaCheck,
    FaUser,
    FaFilter,
    FaUserShield,
    FaSpinner,
    FaSyncAlt,
    FaEnvelope,
    FaPhone,
    FaIdCard
} from "react-icons/fa";

const api_url = import.meta.env.VITE_API_URL

const RegisteredStudentList = () => {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [filterStatus, setFilterStatus] = useState("all");
    const [showFilters, setShowFilters] = useState(false);

    // Fetch all students
    const fetchStudents = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${api_url}/admin/allregisterstudent`, {
                withCredentials: true,
            });
            setStudents(res.data.user);

        } catch (err) {
            console.error("Error fetching students:", err);
        } finally {
            setLoading(false);
        }
    };

    // Search students
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search.trim()) {
            fetchStudents();
            return;
        }
        try {
            setLoading(true);
            const res = await axios.get(
                `${api_url}/searchregisterstudent?query=${search}`,
                { withCredentials: true }
            );
            setStudents(res.data.students);
        } catch (err) {
            console.error("Search failed:", err.response?.data || err.message);
            setStudents([]);
        } finally {
            setLoading(false);
        }
    };

    // Delete student with better UX
    const handleDelete = async (id, name) => {
        const isConfirmed = window.confirm(
            `Are you sure you want to permanently delete ${name}? This action cannot be undone.`
        );
        if (!isConfirmed) return;

        try {
            await axios.delete(`${api_url}/deleteregisterstudent/${id}`, {
                withCredentials: true,
            });
            setStudents(students.filter((s) => s._id !== id));
            alert(`${name} has been successfully deleted.`);
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete student. Please try again.");
        }
    };

    // Restrict/unrestrict student
    const handleRestrict = async (id, currentStatus, name) => {
        const action = currentStatus ? "unrestrict" : "restrict";
        const isConfirmed = window.confirm(
            `Are you sure you want to ${action} ${name}?`
        );
        if (!isConfirmed) return;

        try {
            const res = await axios.get(`${api_url}/ristrictuser/${id}`, {
                withCredentials: true,
            });
            setStudents(
                students.map((s) =>
                    s._id === id ? { ...s, restricted: !s.restricted } : s
                )
            );
            alert(`${name} has been successfully ${action}ed.`);
        } catch (err) {
            console.error("Restrict failed:", err);
            alert(`Failed to ${action} student. Please try again.`);
        }
    };

    // Enhanced Avatar component with fallback
    const StudentAvatar = ({ student, size = "w-16 h-16" }) => {
        const [avatarError, setAvatarError] = useState(false);
        const [avatarLoaded, setAvatarLoaded] = useState(false);

        const getInitials = (name) => {
            if (!name) return "S";
            return name
                .split(' ')
                .map(word => word.charAt(0))
                .join('')
                .toUpperCase()
                .slice(0, 2);
        };

        const getProcessedAvatarUrl = (url) => {
            if (!url) return null;
            if (url.includes('googleusercontent.com')) {
                const baseUrl = url.split('=')[0];
                return `${baseUrl}=s96-c`;
            }
            return url;
        };

        const processedUrl = getProcessedAvatarUrl(student.avatar);

        if (processedUrl && !avatarError) {
            return (
                <div className="relative">
                    <img
                        src={processedUrl}
                        alt={`${student.name} avatar`}
                        className={`${size} rounded-full object-cover border-3 border-purple-500/30 shadow-xl transition-all duration-300 ${avatarLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                        onError={() => setAvatarError(true)}
                        onLoad={() => setAvatarLoaded(true)}
                        crossOrigin="anonymous"
                        referrerPolicy="no-referrer"
                    />
                    {!avatarLoaded && (
                        <div className={`absolute inset-0 ${size} rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 animate-pulse border-3 border-purple-500/30`}>
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        return (
            <div className={`${size} rounded-full bg-gradient-to-br from-purple-500 via-indigo-600 to-pink-600 flex items-center justify-center border-3 border-purple-500/30 shadow-xl`}>
                <span className="text-lg font-bold text-white">
                    {getInitials(student.name)}
                </span>
            </div>
        );
    };

    // Student Card Component
    const StudentCard = ({ student, index }) => (
        <div
            className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105 hover:border-purple-500/30"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            {/* Header with Avatar and Status */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <StudentAvatar student={student} />
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1">{student.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-slate-400">
                            <FaIdCard className="w-3 h-3" />
                            <span>ID: {student._id.slice(-8)}</span>
                        </div>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="flex-shrink-0">
                    {student.restricted ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-900/60 text-red-300 border border-red-700/50 shadow-lg">
                            <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                            Restricted
                        </span>
                    ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-900/60 text-green-300 border border-green-700/50 shadow-lg">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                            Active
                        </span>
                    )}
                </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-slate-300">
                    <div className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center">
                        <FaEnvelope className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Email</p>
                        <p className="text-sm font-medium">{student.email}</p>
                    </div>
                </div>

                {student.number && (
                    <div className="flex items-center space-x-3 text-slate-300">
                        <div className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center">
                            <FaPhone className="w-4 h-4 text-indigo-400" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-400">Phone</p>
                            <p className="text-sm font-medium">{student.number}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 pt-4 border-t border-slate-700/50">
                <button
                    onClick={() => handleRestrict(student._id, student.restricted, student.name)}
                    className={`flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${student.restricted
                            ? "bg-green-900/60 text-green-300 hover:bg-green-800/70 border border-green-700/50 hover:border-green-600/50"
                            : "bg-yellow-900/60 text-yellow-300 hover:bg-yellow-800/70 border border-yellow-700/50 hover:border-yellow-600/50"
                        }`}
                >
                    {student.restricted ? <FaCheck className="w-4 h-4 mr-2" /> : <FaBan className="w-4 h-4 mr-2" />}
                    {student.restricted ? "Unrestrict" : "Restrict"}
                </button>

                <button
                    onClick={() => handleDelete(student._id, student.name)}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-red-900/60 text-red-300 rounded-xl text-sm font-medium hover:bg-red-800/70 transition-all duration-300 border border-red-700/50 hover:border-red-600/50"
                >
                    <FaTrash className="w-4 h-4 mr-2" />
                    Delete
                </button>
            </div>
        </div>
    );

    // Filter students based on status
    const filteredStudents = students.filter(student => {
        if (filterStatus === "active") return !student.restricted;
        if (filterStatus === "restricted") return student.restricted;
        return true;
    });

    useEffect(() => {
        fetchStudents();
    }, []);



    return (
        <div className="h-full bg-none text-white">
            <div id="main-div" className="p-6 h-full overflow-y-auto scrollbar-hide">
                {/* Header Section */}
                <div className="flex justify-center mb-6 items-center space-x-3">
                    
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                            Student Management
                        </h1>
                        <p className="text-slate-300 font-medium">
                            Manage and monitor registered students
                        </p>
                    </div>
                </div>



                {/* Controls Section - Dark Theme */}
                <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-slate-700/50 shadow-2xl">
                    {/* Search and Filters */}
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="flex items-center space-x-3 flex-1 max-w-md">
                            <div className="relative flex-1">
                                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search by name, email, or phone..."
                                    className="w-full pl-12 pr-4 py-3 bg-slate-900/60 border border-slate-600 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-slate-400"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-2xl font-medium hover:from-purple-700 hover:to-indigo-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                            >
                                {loading ? <FaSpinner className="animate-spin" /> : <FaSearch />}
                                <span>Search</span>
                            </button>
                        </form>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="px-4 py-3 bg-slate-700/70 hover:bg-slate-600/70 text-slate-200 rounded-2xl font-medium transition-all duration-300 flex items-center space-x-2 border border-slate-600"
                            >
                                <FaFilter />
                                <span>Filter</span>
                            </button>

                            <button
                                onClick={fetchStudents}
                                disabled={loading}
                                className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg disabled:opacity-50"
                            >
                                {loading ? <FaSpinner className="animate-spin" /> : <FaSyncAlt />}
                                <span>Refresh</span>
                            </button>
                        </div>
                    </div>

                    {/* Filter Options - Dark Theme */}
                    {showFilters && (
                        <div className="mt-4 pt-4 border-t border-slate-600">
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setFilterStatus("all")}
                                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${filterStatus === "all"
                                            ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                                            : "bg-slate-700/70 text-slate-300 hover:bg-slate-600/70"
                                        }`}
                                >
                                    All Students ({students.length})
                                </button>
                                <button
                                    onClick={() => setFilterStatus("active")}
                                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${filterStatus === "active"
                                            ? "bg-green-600 text-white shadow-lg shadow-green-500/30"
                                            : "bg-slate-700/70 text-slate-300 hover:bg-slate-600/70"
                                        }`}
                                >
                                    Active ({students.filter(s => !s.restricted).length})
                                </button>
                                <button
                                    onClick={() => setFilterStatus("restricted")}
                                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${filterStatus === "restricted"
                                            ? "bg-red-600 text-white shadow-lg shadow-red-500/30"
                                            : "bg-slate-700/70 text-slate-300 hover:bg-slate-600/70"
                                        }`}
                                >
                                    Restricted ({students.filter(s => s.restricted).length})
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Students Cards Grid */}
                <div className="mb-6">
                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <div className="text-center">
                                <FaSpinner className="w-8 h-8 text-purple-400 animate-spin mx-auto mb-4" />
                                <p className="text-slate-300 font-medium">Loading students...</p>
                            </div>
                        </div>
                    ) : filteredStudents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredStudents.map((student, index) => (
                                <StudentCard key={student._id} student={student} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-16 border border-slate-700/50 text-center">
                            <FaUser className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                            <p className="text-slate-400 font-medium text-lg mb-2">No students found</p>
                            <p className="text-slate-500 text-sm">Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </div>
            </div>
            <style>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default RegisteredStudentList;
