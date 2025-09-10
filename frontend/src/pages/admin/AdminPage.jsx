import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../../components/admin/AdminSideNavbar'
import AdminNavbar from '../../components/admin/AdminNavbar'

const AdminPage = () => {
  return (
    <div className="h-screen bg-gray-950 text-white overflow-hidden">
      {/* Fixed Top Navbar */}
      <div className="fixed top-0 left-0 right-0 h-14 z-50">
        <AdminNavbar />
      </div>
      
      {/* Layout Container - Account for fixed navbar */}
      <div className="flex pt-14 h-screen">
       

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-950">
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminPage
