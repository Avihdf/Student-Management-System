import React from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import axios from 'axios';

axios.defaults.withCredentials = true;

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

//Import Admin Pages
import AdminPage from './pages/admin/AdminPage';
import AdminDashboard from './pages/admin/AdminDashboard'

//Import Student Pages
import StudentDashboard from './pages/student/StudentDashboard'
import StudentPage from './pages/student/StudentPage';



const App = () => {

  // const adminPages = useMatch('/admin/*')
  // const studentPages = useMatch('/student/*')
  return (
    <div>

        <Routes>
          
          {/* Public Routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />


          {/* Admin Routes */}
          <Route path="/admin" element={<AdminPage />}>
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>


          {/* Student Routes */}
          <Route path="/student" element={<StudentPage />}>
            <Route path="dashboard" element={<StudentDashboard />} />
          </Route>

        </Routes>
      </div>


   
  )
}

export default App



