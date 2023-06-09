import React from "react"
import {Route,Routes} from "react-router-dom"
import DashboardPage from "../Pages/Admin/DashboardPage"
import AdminLogin from "../Pages/Admin/AdminLoginPage"
import UserListPage from "../Pages/Admin/UserLIstPage"
import TutorLIstPage from "../Pages/Admin/TutorLIstPage"
import AddTutorPage from "../Pages/Admin/AddTutorPage"


function AdminRouter() {
  return(
    <Routes>
      <Route path="/dashboard" element={<DashboardPage/>}  />
      <Route path="/" element={<AdminLogin/>} />
      <Route path="/users" element={<UserListPage/>} />
      <Route path="/tutors" element={<TutorLIstPage/>}/>
      <Route path="/add-tutor" element={<AddTutorPage/>}/>

      
    </Routes>
  )
}

export default AdminRouter ;