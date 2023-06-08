import React from "react";
import Header from "../../Componants/Header/AdminHeader";
import Sidebar from "../../Componants/Sidebar/Sidebar";
function DashboardPage() {

  return(
    <>
    <Sidebar admin={true} />
    <Header role={'admin'} />
    </>
  )
}

export default DashboardPage ;