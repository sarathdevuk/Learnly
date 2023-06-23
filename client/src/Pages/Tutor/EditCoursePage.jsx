import React from 'react'
import Header from '../../Componants/Header/AdminHeader'
import Sidebar from '../../Componants/Sidebar/Sidebar'
import EditCourse from '../../Componants/Tutor/EditCourse/EditCourse'


function EditCoursePage() {
  return (
    <div>
      <Sidebar tutor={true}/>
      <Header role={'tutor'} /> 
    <div className='admin-page pt-4'> 
      <EditCourse/> 
    </div>
    </div>
  )
}

export default EditCoursePage