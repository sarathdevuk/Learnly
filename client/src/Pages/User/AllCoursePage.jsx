import React from 'react'
import ViewAllCourse from '../../Componants/User/ViewAllCourse/ViewAllCourse'
import UserHeader from '../../Componants/User/UserHeader/UserHeader'
import Footer from '../../Componants/User/Footer/Footer'

function AllCoursePage() {
  return (
    <React.Fragment>
      <UserHeader/>
      <ViewAllCourse/>
      <Footer/>

    </React.Fragment>
  )
}

export default AllCoursePage