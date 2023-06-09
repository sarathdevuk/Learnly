import React from 'react'
import TutorList from '../../Componants/Admin/TutorList/TutorList'
import Sidebar from '../../Componants/Sidebar/Sidebar'
import Header from '../../Componants/Header/AdminHeader'


export default function UserListPage() {

  return (

    <div className='relative'>
      <Sidebar admin={true}/>
      <Header role={'admin'} />
    <div className='admin-page p-3'>
      <TutorList/>

    </div>


    </div>

  )
}

