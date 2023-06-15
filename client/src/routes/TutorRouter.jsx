import React from "react";
import { Route , Routes } from "react-router-dom";
import TutorDashboard from "../Pages/Tutor/TutorDashboard";
import TutorLoginPage from "../Pages/Tutor/TutorLoginPage";
import ChangePasswordPage from "../Pages/Tutor/ChangePasswordPage";
import PrivateRoutes from "../utils/PrivateRoutes"; 
import ErrorPage from "../Componants/ErrorPage/ErrorPage";
import AddCouresePage from "../Pages/Tutor/AddCouresePage";

function TutorRouter() {
  return (

    <Routes > 

      <Route element={<PrivateRoutes role={"tutor"} route={'/tutor'} />} >
       <Route path="/dashboard" element= {<TutorDashboard/>} /> 
       <Route path="/add-course" element={<AddCouresePage/>} />
      <Route path="/change-password" element ={<ChangePasswordPage/>}/>

      </Route>
      <Route path="/*" element={<ErrorPage/>} />
      <Route path="/" element= {<TutorLoginPage/>} />

    </Routes>  
  )
}

export default TutorRouter