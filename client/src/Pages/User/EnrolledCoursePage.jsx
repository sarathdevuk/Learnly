import React , {useState , useEffect} from 'react'
import UserHeader from '../../Componants/User/UserHeader/UserHeader'

import Loader from '../../Componants/User/Loader/Loader'
import { getEnrolledCourse } from '../../services/userApi';
import { toast } from 'react-toastify';
import HorizontalCourseCard from '../../Componants/User/HorizontalCourseCard/HorizontalCourseCard';


function EnrolledCoursePage() {
  const [enrolledCourse  , setEnrolledCourse ] = useState();
  const [loading  , setLoading ] = useState(true); 

  useEffect(()=> {
    getEnrolledCourse().then((response) => {
        if(response.data.status) {
          setEnrolledCourse(response.data.enrolledCourse)
          setLoading(false)
        } 
    })
      .catch((err) => {
        toast.error("Oops.. Something went wrong " , {
          position: "top-center"
        })
      })
  })


  return (
     <> 
     <UserHeader/>
        <div className='pl-9 mb-10'>
        <h3 className="text-3xl sm:text-4xl  mt-8  mb-4 ml-2 sm:ml-5 ">My Enrollments</h3>
      </div> 

      {loading ?
        <Loader />
        :
        <div>
          {enrolledCourse.length ?
            <>
              {enrolledCourse && enrolledCourse.map((courseDetails) => {
                return (
                  <HorizontalCourseCard key={courseDetails._id} courseDetails={courseDetails} />
                )
              })
              }
            </>
            :
            <div className='flex justify-center flex-col items-center mb-10'>
              <img src="/images/noCourse.svg" alt="" />
              <p>No enrolled courses</p>
            </div>
          }
        </div>
      }



     </>
  )
}

export default EnrolledCoursePage