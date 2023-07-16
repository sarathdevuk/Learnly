import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import {Menu , Transition } from '@headlessui/react'
import { ToastContainer , toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteCourse, getCourse } from '../../../services/tutorApi'
import { setCourseDetails } from '../../../Redux/Features/courseSlice'
import swal from 'sweetalert'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


function ViewCourse() {

  const dispatch = useDispatch();
  const navigate = useNavigate() ;
  const [course , setCourse] = useState([]);

  useEffect(() => {
    getCourse().then((response) => {

      setCourse(response.data.course) ;
    })
  } , [])


  const handleDelete = (courseId) => {
    swal({
      title : "Are you sure ?",
      text:"Once deleted , you will not be able to recover file .!",
      icon : "warning",
      buttons : true ,
      dangerMode : true
    })
    .then((willDelete) => {
      if(willDelete) {
        deleteCourse(courseId).then((response) => {
          if(response.data.status){
            successMessage(response.data.message , "delete")
            setCourse(course.filter(obj => obj._id != courseId))
          }else{
            generateError(response.data.message)
          }
        })

      }
    })


  }


  const generateError=(message)=>{
    toast.error(message , {
      position: "top-center"
    })
  }

  const successMessage = (message , id)=> {
    toast.success(message , {
      position : "top-center" ,
      toastId: id ,
    })
  }


  return (
    <>
    <div className='mb-4 pb-2 mt-7 ' >
      <span className='font-medium text-2xl text-black'>Manage Courses</span>
    </div>
    <div className="bg-white relative overflow-x-auto shadow-md sm:rounded-lg p-5 md:mr-6 ">
      <div className="flex items-center justify-between pb-4">
        <div>

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Last 30 days
                {/* <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Edit
                      </a>
                    )}
                  </Menu.Item>

                </div>


                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Delete
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
          </div>
          <input type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-50 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" />
        </div>
      </div>
      <table className="w-full text-sm mt-4 text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Course Image
            </th>
            <th scope="col" className="px-6 py-3">
              Course Title
            </th>
            <th scope="col" className="px-6 py-3">
              Duration
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {
            course.map((obj, index) => { 
          
              return (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                    </div>
                  </td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <img src= { import.meta.env.VITE_SERVER_URL + obj.image.path } width="80px" alt='Course Image' />
                  </th>
                  <td className="px-6 py-4">
                    {obj.name}
                  </td>
                  <td className="px-6 py-4">
                    {obj.duration}
                  </td>
                  <td className="px-6 py-4">
                    {obj.price}
                  </td>
                  <td className="px-6 py-6 mt-2 flex justify-center items-center">
                    <button type="button" onClick={() => {
                      navigate(`/tutor/edit-course/${obj._id}`)
                      dispatch(setCourseDetails(obj));
                    }} className="text-white bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-200 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 dark:focus:ring-yellow-800">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                      </svg>

                      <span className="sr-only">Icon description</span>
                    </button>

                    <button type="button" className="text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm p-2.5  text-center mr-2  dark:bg-red-400 dark:hover:bg-red-500 dark:focus:ring-red-900"
                      onClick={() => { handleDelete(obj._id) }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>

                      <span className="sr-only">Icon description</span>
                    </button>
                  </td>
                </tr>
              )
            })
          }

        </tbody>
      </table>
      <nav className="flex items-center justify-between p-3 mt-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span></span>
        <ul className="inline-flex items-center -space-x-px">
          <li>
            <a href="#" className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Previous</span>
              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            </a>
          </li>
          <li>
            <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
          </li>
          <li>
            <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
          </li>
          <li>
            <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
          </li>
          <li>
            <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
          </li>
          <li>
            <a href="#" className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Next</span>
              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
            </a>
          </li>
        </ul>
      </nav>
      <ToastContainer />

    </div>
  </>
  )
}

export default ViewCourse