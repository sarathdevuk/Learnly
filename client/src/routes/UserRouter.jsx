import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/User/HomePage";
import LoginPage from "../Pages/User/LoginPage";
import SignupPage from "../Pages/User/SignupPage";
import OtpPage from "../Pages/User/OtpPage";
import PrivateRoutes from "../utils/PrivateRoutes";
import AccountPage from "../Pages/User/AccountPage";
import AllCoursePage from "../Pages/User/AllCoursePage";
import CourseDetailsPage from "../Pages/User/CourseDetailsPage";
import OrderSummaryPage from "../Pages/User/OrderSummaryPage";

function UserRouter() {
  return (
    <Routes>
      <Route element={<PrivateRoutes role={"user"} route={"/login"} />}> 
        <Route path="/profile"  element={<AccountPage />} />
        <Route path="/course-payment/:courseId"  element={ <OrderSummaryPage />} />

      </Route>

        <Route path="/courses" element={<AllCoursePage />}/>
        <Route path="/course/:courseId" element={<CourseDetailsPage />}/>

        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/otp" element={<OtpPage />} />
      
    </Routes>
  );
}

export default UserRouter;
