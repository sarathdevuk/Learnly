import React from "react";
import { Route , Routes } from "react-router-dom";
import TutorDashboard from "../Pages/Tutor/TutorDashboard";
import TutorLoginPage from "../Pages/Tutor/TutorLoginPage";
import ChangePasswordPage from "../Pages/Tutor/ChangePasswordPage";

function TutorRouter() {
  return (

    <Routes >
      <Route path="/dashboard" element= {<TutorDashboard/>} /> 
      <Route path="/" element= {<TutorLoginPage/>} />
      <Route path="/change-password" element ={<ChangePasswordPage/>}/>

    </Routes>
  )
}

export default TutorRouter