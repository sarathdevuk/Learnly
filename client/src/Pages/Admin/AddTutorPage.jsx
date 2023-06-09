import React from 'react'
import Sidebar from '../../Componants/Sidebar/Sidebar'
import Header from '../../Componants/Header/AdminHeader'
import AddTutor from '../../Componants/Admin/AddTutor/AddTutor'


export default function UserListPage() {

  return (

    <div className='relative'>
      <Sidebar admin={true}/>
      <Header role={'admin'} />
    <div className='admin-page p-3'>
      <AddTutor/>

    </div>


    </div>

  )
}

