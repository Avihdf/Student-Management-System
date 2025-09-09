import React from 'react'
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminSidebar from '../../components/admin/AdminSideNavbar';

const AdminPage = () => {
  return (
    <div className="bg-gray-950 min-h-screen text-white overflow-hidden">
      {/* Admin Navbar - Fixed at top */}
      <AdminNavbar />
      
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
          <AdminSidebar />
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

export default AdminPage
