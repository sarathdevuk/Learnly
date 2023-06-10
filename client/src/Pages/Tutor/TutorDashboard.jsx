import React from 'react'
import Header from '../../Componants/Header/AdminHeader'
import Sidebar from '../../Componants/Sidebar/Sidebar'


function TutorDashboard() {
  return (
    <div>
      <Header role={'tutor'}  /> 
      <Sidebar tutor={true}  /> 



    </div>
  )
}

export default TutorDashboard