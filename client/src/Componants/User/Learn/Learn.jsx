import React  ,{useState , useEffect } from 'react'  
import { Link , useNavigate , useParams } from 'react-router-dom'
import Footer from '../Footer/Footer'
import SyllabusDropdown from '../SyllabusDropdown/SyllabusDropdown'
import { getCourseDetails } from '../../../services/userApi'
function Learn() {
  
  const [courseDetails , setCourseDetails ] = useState([])


  const {courseId} = useParams()

  useEffect(()=> {

    getCourseDetails

  }, [])


  return (
    <section>
    <div className="mx-auto  h-screen">
        <div className="flex flex-col sm:flex-row  ">
            <div className="w-full lg:w-8/12 overflow-auto">
                <div className='flex text-slate-700 items-center py-4 pl-2 border-b border-slate-300'>
                    <Link to={'/my-enrollments'}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                        </svg>
                    </Link>

                    <h1 className="ml-3 text-md ">
                      Python Django Course
                      </h1>
                </div>

                <div>
                   
                        
                        <div 
                           className='cursor-pointer relative flex justify-center items-center'>
                            <div className='absolute text-white'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                                </svg>

                            </div>
                            <img 
                            //  src={courseDetails && 'http://localhost:5000/'+courseDetails.courseInfo.image.path} alt=""
                              />
                        </div>
             


                    <div className="course-info-wrap p-5">
                        {/* //author section */}

                        <div>
                            <h3 className="text-2xl  mt-8 font-semibold mb-4 ">Author</h3>
                            <blockquote className="rounded-lg bg-gray-100 p-8">
                                <div className="flex items-center gap-4">
                                    <img
                                        alt="Man"
                                        // src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                                        src='https://img.freepik.com/free-vector/cartoon-businesswoman-working-with-laptop-gesture-pose-clip-art_40876-3410.jpg?w=900&t=st=1688453387~exp=1688453987~hmac=d7295e46bc0b2eb2e4f45813eeae102fd22c1edcb1f68cdc4115834ecc6080f0'
                                        // src='https://cdn-icons-png.flaticon.com/512/145/145843.png?w=740&t=st=1688454207~exp=1688454807~hmac=52c75a7aea9463ddd346b6747be41c284e0d6e00b1ea5c27e31671d2a8955b07'
                                        className="h-16 w-16 rounded-full object-cover"
                                    />

                                    <div>
                                        <p className="mt-1 text-lg font-medium text-gray-700">
                                          {/* {courseDetails && courseDetails.teacher.firstName} */}
                                          </p>
                                    </div>
                                </div>

                                <p className="line-clamp-2 sm:line-clamp-none mt-4 text-gray-500">
                                  Iam a good teacher
                                    {/* {courseDetails && courseDetails.teacher.about} */}
                                </p>
                            </blockquote>
                        </div>

                        {/* //about section */}

                        <div>
                            <h3 className="text-2xl  mt-8 font-semibold mb-4 ">About</h3>
                            <div className='border rounded-md p-3 '>
                                <p className='text-slate-600 mt-4'>
                                  {/* {courseDetails && courseDetails.courseInfo.about} */}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        <Footer />
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-4/12 border-l border-slate-300  items-center  sm:h-screen top-0 sm:sticky overflow-auto ">
                <div>
                    <div className='border-b border-slate-300 p-3 w-full relative lg:fixed top-0  z-50 bg-white'>
                        <h3 className="text-2xl  font-semibold tracking-wider">Syllabus</h3>
                    </div>
                    <div>
                        <div className=" mt-14">
                            <div className="syllabus syllabus-wrap    rounded-lg">
                              {/* <SyllabusDropdown /> */}
                                {/* {courseDetails && courseDetails.course.map((course, index) => (
                                    <SyllabusDropdown course={course} index={index} key={index} toggleDropdown={toggleDropdown} getYoutubeVideoId={getYoutubeVideoId} />
                                ))} */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block lg:hidden">
                    <Footer />
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default Learn