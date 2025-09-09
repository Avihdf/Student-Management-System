import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentNavbar from '../../components/student/StudentNavbar'
import StudentSideNavbar from '../../components/student/StudentSideNavbar'

const StudentPage = () => {
  return (
    <div className="bg-white min-h-screen text-black overflow-hidden">
      {/* Student Navbar - Fixed at top */}
      <StudentNavbar />

      {/* Layout Container */}
      <div className="flex h-screen ">
        {/* Sidebar Container - Responsive positioning */}
        <div className="
          /* Mobile: Hidden by default, shown via sidebar's own toggle */
          fixed inset-y-0 left-0 z-40
          /* Tablet and up: Static positioning */
          lg:static lg:flex-shrink-0
          /* Ensure it accounts for navbar height */
          pt-14 lg:pt-0
        ">
         <StudentSideNavbar />
        </div>

        {/* Main Content Area - Responsive margins */}
        <main className="
          flex-1 overflow-y-auto bg-gray-950
          /* Mobile: Full width (sidebar overlays when open) */
          w-full
          /* Large screens: Account for sidebar width */
          lg:ml-0
          /* Padding adjustments for different screen sizes */
          p-3 sm:p-4 lg:p-6
          /* Ensure proper spacing from top */
          pt-0
        ">
          {/* Content wrapper for better spacing */}
          <div className="max-w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default StudentPage
