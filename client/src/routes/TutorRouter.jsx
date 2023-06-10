import React from "react";
import { Route , Routes } from "react-router-dom";
import TutorDashboard from "../Pages/Tutor/TutorDashboard";
import TutorLoginPage from "../Pages/Tutor/TutorLoginPage";

function TutorRouter() {
  return (

    <Routes >
      <Route path="/dashboard" element= {<TutorDashboard/>} /> 
      <Route path="/" element= {<TutorLoginPage/>} /> 
     
    </Routes>
  )
}

export default TutorRouter