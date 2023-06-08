import React from "react"
import {Route,Routes} from "react-router-dom"
import DashboardPage from "../Pages/Admin/DashboardPage"
import AdminLogin from "../Pages/Admin/AdminLoginPage"
import UserListPage from "../Pages/Admin/UserLIstPage"


function AdminRouter() {
  return(
    <Routes>
      <Route path="/dashboard" element={<DashboardPage/>}  />
      <Route path="/" element={<AdminLogin/>} />
      <Route path="/users" element={<UserListPage/>} />
    </Routes>
  )
}

export default AdminRouter ;