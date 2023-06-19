import React from 'react'
import Header from '../../Componants/Header/AdminHeader'
import Sidebar from '../../Componants/Sidebar/Sidebar'
import ViewCourse from '../../Componants/Tutor/VIewCourse/ViewCourse'

function ViewCoursePage() {
  return (
    <div className='relative'>
      <Sidebar  tutor={true}/>
      <Header role={'tutor'} />

      <div className='admin-page p-3'>
        <ViewCourse />
      </div>
    </div>
  )
}

export default ViewCoursePage