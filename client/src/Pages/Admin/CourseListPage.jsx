import React from 'react'
import Header from '../../Componants/Header/AdminHeader'
import Sidebar from '../../Componants/Sidebar/Sidebar'
import Table from '../../Componants/Table/Table'

function CourseListPage() {
  return (
   
    <div> 
      <Sidebar admin={true} /> 
      <Header role={'admin'} /> 
          <Table/>  
      </div>
  )
}

export default CourseListPage