import React from 'react'
import Header from '../../Componants/Header/AdminHeader'
import Sidebar from '../../Componants/Sidebar/Sidebar'
import AddCourse from '../../Componants/Tutor/AddCourse/AddCourse'

function AddCouresePage() {
  return (
    <div className='relative'>
        <Sidebar tutor={true} />
        <Header role={'tutor'} />
        <div className='admin-page p-3'>
          <AddCourse/>
        </div>
    </div>
  )
}

export default AddCouresePage