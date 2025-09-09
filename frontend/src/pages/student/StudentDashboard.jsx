import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { useauth } from '../../context/AppContext';

const StudentDashboard = () => {
    const location = useLocation();
    const [message, setMessage] = useState(location.state?.message || '');
    const { user,loading } = useauth();

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 4000);
            return () => clearTimeout(timer);
        }
    }, [message]);

     if (loading) return <p>Loading...</p>;
  if (!user) return <p>You are not logged in as admin.</p>;

    return (
        <div>
            {message && (
                <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded-lg shadow-md border-l-4 border-green-500 flex items-center gap-2 z-50">
                    <FaCheck className='text-green-500 text-[25px]' />
                    <span>{message}</span>
                </div>
            )}
            <h1 className="text-3xl text-white font-bold">Student Dashboard</h1>
            <p className='text-2xl font-semibold text-white'>{user?.name}</p>
            <p className="mt-4 text-gray-400">Welcome to the student dashboard!</p>
        </div>
    )
}

export default StudentDashboard
