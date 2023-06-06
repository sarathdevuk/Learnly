import React from "react"
import {Route,Routes} from "react-router-dom"
import DashboardPage from "../Pages/Admin/DashboardPage"
import AdminLogin from "../Pages/Admin/AdminLoginPage"

function AdminRouter() {
  return(
    <Routes>
      <Route path="/dashboard" element={<DashboardPage/>}  />
      <Route path="/" element={<AdminLogin/>} />
    </Routes>
  )
}

export default AdminRouter ;