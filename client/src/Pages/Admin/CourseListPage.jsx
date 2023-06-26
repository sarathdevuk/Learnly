import React, { useEffect, useState } from 'react'
import Header from '../../Componants/Header/AdminHeader'
import Sidebar from '../../Componants/Sidebar/Sidebar'
import Table from '../../Componants/Table/Table'
import {toast} from 'react-toastify'
import { changeCourseStatus, getAllCourse } from '../../services/adminApi';


function CourseListPage() {

  const [ course , setCourse ] =  useState();
  const [pagination , setPagination] = useState();

  // Table Headers for list course table
  const tableHeader = [
    {title: "Image"},
    {title: "Title"},
    {title: "Tutor"},
    {title: "Duration"},
    {title: "Status"},
    {title: "Action"},
  ]

  const getCourseDetails = (page) => {
    getAllCourse(page).then((response)=>{
      console.log("pagination ", response.data.pagination);
        setCourse(response.data.course)
        setPagination(response.data.pagination)
    })
    .catch((response) =>{
      toast.error(response.data.message , {
        position: "top-center" })
    })
  }
  
  useEffect(()=> {
    getCourseDetails(1);
  },[])


  const handleStatus = (id , status) => {
    changeCourseStatus( id , status).then((response)=> {
      console.log("success");
      setCourse(course.map((obj)  => {
        if(obj._id == id) {
          obj.status = status =='block' ? false : true
        }
        return obj ;
      }))
      toast.success(response.data.message , { position : "top-center"})
   
    })
    .catch((response) => {
      toast.error(response.message , {
        position : "top-center"
      })
    })
  }


  return (
   
    <div> 
      <Sidebar admin={true} /> 
      <Header role={'admin'} /> 
        <div className='admin-page p-3'>
          <Table tableHeader={tableHeader} type={'Course'} course = {course}  handleStatus={handleStatus} getDetails={getCourseDetails} pagination={pagination} />  
        </div>

      </div>
  )
}

export default CourseListPage