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
import OrderSuccessPage from "../Pages/User/OrderSuccessPage";
import OrderFailedPage from "../Pages/User/OrderFailedPage";
import EnrolledCoursePage from "../Pages/User/EnrolledCoursePage";
import LearnPage from "../Pages/User/LearnPage";
import SearchPage from "../Pages/User/SearchPage";
import CourseFilterCard from "../Componants/User/CourseFilterCard/CourseFilterCard";
import CommunityPage from "../Pages/User/CommunityPage";
import CommunityHomePage from "../Pages/User/CommunityHomePage";
import GroupPage from "../Pages/User/GroupPage";
import MessengerPage from "../Pages/User/MessengerPage";

function UserRouter() {
  return (
    <Routes>
      <Route element={<PrivateRoutes role={"user"} route={"/login"} />}> 
        <Route path="/profile"  element={<AccountPage />} />
        <Route path="/course-payment/:courseId"  element={ <OrderSummaryPage />} />
        <Route path="/order-success"  element={ <OrderSuccessPage />} />
        <Route path="/order-failed"  element={ <OrderFailedPage />} />
        <Route path="/my-enrollments" element={<EnrolledCoursePage/>} />
        <Route path="/course/learn/:courseId" element={<LearnPage/>} />
        <Route path="/community-home" element = {<CommunityHomePage/> } /> 
        <Route path="/groups" element = {<GroupPage/> } /> 
        <Route path="/messages" element = {<MessengerPage/> } /> 


      </Route>

        <Route path="/courses" element={<AllCoursePage />}/>
        <Route path="/course/:courseId" element={<CourseDetailsPage />}/>

        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/community" element={ <CommunityPage />} /> 
        


        <Route path="/test" element={<CourseFilterCard />} />

      
    </Routes>
  );
}

export default UserRouter;
