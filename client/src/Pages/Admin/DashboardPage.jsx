import React from "react";
import Header from "../../Componants/Header/AdminHeader";
import Sidebar from "../../Componants/Sidebar/Sidebar";
function DashboardPage() {

  return(
    <>
    <Header role={'admin'} />
    <Sidebar admin={true} />
    </>
  )
}

export default DashboardPage ;