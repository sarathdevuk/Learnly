import React from 'react';
import { useDispatch, } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCourseDetails } from '../../../Redux/Features/courseSlice';


function HorizontalCourseCard({ courseDetails }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className='mx-5 lg:mx-20 mb-10'>
            <div onClick={() => {
                const course = courseDetails.course.course.map(obj => {
                    return { ...obj, open: false };
                });
                dispatch(setCourseDetails({ ...courseDetails,courseInfo:{...courseDetails}, course }))
                navigate(`/course/learn/${courseDetails.course._id}`)
            }} className="flex justify-center mt-4 sm:mx-10 m-3">
                <div className="flex p-4 w-full max-w-screen-lg hover:bg-violet-50 flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md md:flex-row  dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <img className="rounded-md mt-4 sm:mt-0 w-80 h-40 md:w-56 md:h-32 object-cover" src={import.meta.env.VITE_SERVER_URL + courseDetails.course.image.path}  />
                    <div className="flex flex-col ml-0 sm:ml-3 justify-between mt-2 sm:0 p-4 leading-normal">
                        <h5 className="mb-2 text-xl  font-bold tracking-tight text-gray-900 dark:text-white">{courseDetails.course.name}</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{courseDetails.course.course.length} lessons</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HorizontalCourseCard