import React, { useState,useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaLock, FaCheck, FaTimes } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useEffect } from 'react';
import { useauth } from '../context/AppContext';


const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { admindetails, userdetails } = useauth();


  const [userType, setUserType] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(location.state?.error || '')
  const [message, setMessage] = useState(location.state?.message || '');



  const api_url = import.meta.env.VITE_API_URL

  const Spinner = () => (
    <svg
      className="animate-spin h-5 w-5 text-white mr-2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  );


  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post(`${api_url}/auth/login`, {
        email,
        password,
        userType
      }, {
        withCredentials: true, // 👈 important for cookies
      })

      const { role } = response.data; // axios automatically parses JSON
     


      // Handle successful login based on user role
      if (role === 'admin') {
          await admindetails();
        // Redirect to admin dashboard

        navigate('/admin/dashboard', { state: { message: response.data.message } });
      } else if (role === 'student') {
        await userdetails();
        // Redirect to student dashboard
        navigate('/student/dashboard', { state: { message: response.data.message } });
      }

    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        `${api_url}/auth/google-auth`,
        { tokenId: credentialResponse.credential },
        { withCredentials: true }
      );

      const { role, message } = res.data;
     

      if (role === 'admin') {
        await admindetails();
        navigate('/admin/dashboard', { state: { message } });
      } else if (role === 'student') {
        await userdetails();
        navigate('/student/dashboard', { state: { message } });
      }
    } catch (err) {
      console.error("Google login error:", err.response?.data || err.message);
      setErrorMessage(err.response?.data?.message || 'Google login failed. Please try again.');
    }
  };

  const handleGoogleError = () => {
    console.log("Google Login Failed");
    setErrorMessage('Google login failed. Please try again.');
  };



  return (
    <div className=" min-h-screen h-full bg-black flex items-center justify-center px-6 pt-10 pb-6">

      <div className="relative w-full max-w-md">
        {/* Main Login Card */}
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-8 relative overflow-hidden">
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gray-950/100 rounded-3xl"></div>

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              {/* Institute Logo/Name */}
              {/* <div className="mb-6">
                <div className="inline-block relative"> */}
              {/* <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20"></div>
                  <div className="relative bg-gray-950 px-6 py-3 rounded-2xl border border-gray-700/50">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      OMS Infotech
                    </h1>
                  </div> */}
              {/* </div>
                <p className="text-gray-400 text-sm mt-3">Student Management System</p>
              </div> */}

              <h2 className="text-2xl font-bold text-white mb-2">Welcome Student</h2>
              <p className="text-gray-400">Sign in to access your dashboard</p>
            </div>


            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2 relative">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="relative w-full px-4 py-1 pt-5 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-transparent  transition-all duration-300 backdrop-blur-sm peer"
                    placeholder="Enter your email"
                    required
                    disabled={isLoading}
                  />
                  <label className={`
      absolute left-4 transition-all duration-300 pointer-events-none flex items-center
      ${email || document.activeElement === email ?
                      'top-2 -translate-y-1/2 text-xs text-white' :
                      'top-1/2 -translate-y-1/2 text-gray-400'
                    }
      peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-400
     `}>
                    <MdEmail className='inline-block mr-1' />
                    Email Address
                  </label>
                </div>
              </div>



              {/* Password Field */}
              <div className="space-y-2">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="relative w-full px-4 py-1 pt-5 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-transparent  transition-all duration-300 backdrop-blur-sm peer"

                    required
                    disabled={isLoading}
                  />
                  <label className={` 
      absolute left-4 transition-all duration-300 pointer-events-none flex items-center
      ${password || document.activeElement === password ?
                      'top-2 -translate-y-1/2 text-xs text-white' :
                      'top-1/2 -translate-y-1/2 text-gray-400'
                    }
      peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-400
      `}>
                    <FaLock className='inline-block mr-1' />
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="w-5 h-5" />
                    ) : (
                      <FaEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex items-center justify-between mt-[-20px]">

                <a href="#forgot" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-5 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative flex items-center justify-center space-x-2">
                  {isLoading ? (
                    <>
                      <Spinner /><span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                      </svg>
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
              <span className="px-4 text-gray-400 text-sm">or continue with</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
            </div>

            {/* Google Login Button */}
            <GoogleLogin className="w-full flex justify-center"
              shape="pill"
              size="large"
              theme="filled_black"

              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />


            {/* Register Link */}
            <div className="text-center mt-4">
              <p className="text-gray-400 text-sm pt-5">
                Don't have an account?{' '}
              </p>
            </div>
            <div className='flex justify-center items-center pt-2'>
              <Link
                to="/register"
                className="bg-gray-900/70 text-white px-36 py-3 rounded-2xl hover:bg-gray-800 hover:scale-102 duration-300 transition-colors">
                Register here
              </Link>
            </div>
          </div>
        </div>

        {message && (
          <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded-lg shadow-md border-l-4 border-green-500 flex items-center gap-2 z-50">
            <FaCheck className='text-green-500 text-[25px]' />
            <span>{message}</span>
          </div>
        )}

        {errorMessage && (
          <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded-lg shadow-md border-l-4 border-red-500 flex items-center gap-2 z-50">
            <FaTimes className='text-red-500 text-[25px]' />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-xs">
          <p>&copy; 2025 OMS Infotech. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Support</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
