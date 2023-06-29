import React, {useEffect , useState } from 'react'
import CourseCard from '../CourseCard/CourseCard'
import { viewAllCourse } from '../../../services/userApi'


function ViewAllCourse() {

  const [course , setCourse] = useState([])
  // const [loading , setloading]= useState(false)

    useEffect(()=>{
      viewAllCourse().then((response)=> {
        console.log("all course", response.data);
        if(response.data.status) {
          setCourse(response.data.course)
        
        }
      })

    },[])



  return (
    <div className='m-7 mt-10 mb-14'>
      <div className='mt-10 grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
        {course.map((course)=>{

          return(
            <CourseCard key={course._id} course={course} />
          )

        })}
      </div>

    </div>
  )
}

export default ViewAllCourse