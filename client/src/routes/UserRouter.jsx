import React from "react";
import { Routes , Route } from 'react-router-dom';
import HomePage from "../Pages/User/HomePage";
import LoginPage from "../Pages/User/LoginPage";
import SignupPage from "../Pages/User/SignupPage";
import OtpPage from "../Pages/User/OtpPage";

function UserRouter() {

  return(
    <Routes >
      
        <Route  path='/'  element= { <HomePage/> }/>
        <Route path="/login" element = {<LoginPage/>}/>
        <Route path="/signup" element = {<SignupPage/>}/>
        <Route path="/otp" element = {<OtpPage/>}/>


    </Routes>
  )
}

export default UserRouter ;