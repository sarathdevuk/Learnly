import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "../Pages/Admin/DashboardPage";
import AdminLogin from "../Pages/Admin/AdminLoginPage";
import UserListPage from "../Pages/Admin/UserLIstPage";
import TutorLIstPage from "../Pages/Admin/TutorLIstPage";
import AddTutorPage from "../Pages/Admin/AddTutorPage";
import PrivateRoutes from "../utils/PrivateRoutes";

function AdminRouter() {
  return (
    <Routes>
      <Route element={<PrivateRoutes role={"admin"} route={"/admin"} />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="/tutors" element={<TutorLIstPage />} />
        <Route path="/add-tutor" element={<AddTutorPage />} />
      </Route>

      <Route path="/" element={<AdminLogin />} />
    </Routes>
  );
}

export default AdminRouter;
