import React, { useState } from 'react'
import Header from '../../Componants/Header/AdminHeader'
import Sidebar from '../../Componants/Sidebar/Sidebar'
import Table from '../../Componants/Table/Table'

function CourseListPage() {

  const [ course , setCourse ] =  useState();


  const tableHeader = [
    {title: "Title"},
    {title: "Tutor"},
    {title: "Duration"},
    {title: "Status"},
    {title: "Action"},
  ]

  return (
   
    <div> 
      <Sidebar admin={true} /> 
      <Header role={'admin'} /> 
        <div className='admin-page p-3'>
          <Table tableHeader={tableHeader} type={'Course'}/>  
        </div>

      </div>
  )
}

export default CourseListPage