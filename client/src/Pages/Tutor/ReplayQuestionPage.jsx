import React from 'react'
import ReplayQuestion from '../../Componants/Tutor/ReplayQuestion/ReplayQuestion'
import Sidebar from '../../Componants/Sidebar/Sidebar'
import Header from '../../Componants/Header/AdminHeader'

function ReplayQuestionPage() {
  return (
    <div className='relative'>
      <Sidebar  tutor={true}/>
      <Header role={'tutor'} />

      <div className='admin-page p-3'>
        <ReplayQuestion/>
      </div>
    </div>
  
  )
}

export default ReplayQuestionPage