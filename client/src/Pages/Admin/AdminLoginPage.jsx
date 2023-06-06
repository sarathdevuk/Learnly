import React from "react";
import Login from "../../Componants/User/Login/Login";
import { adminLogin } from "../../services/adminApi";

function AdminLogin () {
  return (
    <Login admin={true}/>
  )
}

export default AdminLogin ;