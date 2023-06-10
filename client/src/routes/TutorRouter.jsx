import React from "react";
import { Route , Routes } from "react-router-dom";
import TutorDashboard from "../Pages/Tutor/TutorDashboard";


function TutorRouter() {
  return (

    <Routes >
      <Route path="/dashboard" element= {<TutorDashboard/>} /> 
     
    </Routes>
  )
}

export default TutorRouter