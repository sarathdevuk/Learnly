import React from 'react'
import ChangePassword from '../../Componants/Tutor/ChangePassword'
import Sidebar from '../../Componants/Sidebar/Sidebar'
import Header from '../../Componants/Header/AdminHeader'


function ChangePasswordPage() {
  return (
    <div className='relative'> 
      <Sidebar tutor={true} />
      <Header role = {'tutor'} /> 

    <div className="admin-page p-3">
      <ChangePassword/>
    </div>
      
    </div>
  )
}

export default ChangePasswordPage