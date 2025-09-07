import React from 'react'

import { Routes, Route } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

//Import Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

//Import Student Pages
import StudentDashboard from './pages/student/StudentDashboard'

const App = () => {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}

        <Route path="/" element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

    


        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
      </Routes>
    </div>
  )
}

export default App



