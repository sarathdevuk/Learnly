import React,{useState , useEffect} from 'react'
import { blockTutor, getTutors, unBlockTutor } from '../../../services/adminApi';
import { ToastContainer ,toast  } from 'react-toastify';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";



function TutorList() {

  const [tutor , setTutor] = useState();
  const [pagination , setpagination ] = useState();

  // initial load
  useEffect(()=> {
    getTutorsDetails(1)
  },[])
  
  // // get teacher Details
   
  const getTutorsDetails = (page) => {
    getTutors(page).then((response => {
      setTutor(response.data.tutors)
      setpagination(res.data.pagination) 
    }))
    .catch((error)=> {
      
      toast.error(error , {
        position: "top-center"
      })
    })
  }

  // toast success msg

  const successMessage = (message) => {
    toast.success(message , {
      position : "top-center"
    })
  }

  // toast error message 
  const generateError = (error) => {
    toast.error(error , {
      position : "top-center"
    })
  }

  const handleBlock = (tutorId) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to block!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
  }).then((response) => {
    if(response) {
      blockTutor(tutorId).then((response)=> {
        if(response.data.status) {
          setTutor(tutor.map((obj) => {
            if(obj._id = tutorId) {
              obj.status = false
            }
            return obj
          }))
          successMessage(response.data.message) ;
        }else {
          generateError(response.data.message)
        }
      })
    }
  })  
  } 

  const handleUnblock = (tutorId) => {
    unBlockTutor(tutorId).then((response) => {
      if(response.data.status) {
        setTutor(tutor.map((obj) => {
           if(obj._id== tutorId) {
            obj.status = true ;
           }
           return obj
        }))
        successMessage(response.data.message)
      }else{
        generateError(response.data.message)
      }
    })
  }


  return (
    <div>
         <div className='m-4 text-2xl font-semibold'>
                <h1>Manage Tutors</h1>
            </div>

            <div className="relative bg-white border overflow-x-auto shadow-md sm:rounded-lg p-5 md:mr-6 ">
                <div className="flex items-center justify-between pb-4"> 
                <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                       <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                     </div>
                    <input type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-50 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" />
                </div>
                
                </div>
                <table className="w-full text-sm mt-4 text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                First Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Last Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tutor && tutor.map((obj, index) => {
                                return (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {obj.firstName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {obj.lastName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {obj.phone}
                                        </td>
                                        <td className="px-6 py-4">
                                            {obj.status ?
                                                <span className='text-green-600'>True</span>
                                                :
                                                <span className='text-red-600'>Blocked</span>
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            {obj.email}
                                        </td>
                                        {obj.status ?
                                            <td className="px-6 py-4 flex justify-center items-center">

                                                <button type="button" className="text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm p-2.5  text-center mr-2 mb-2 dark:bg-red-400 dark:hover:bg-red-500 dark:focus:ring-red-900"
                                                    onClick={() => { handleBlock(obj._id) }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                                    </svg>
                                                    <span className="sr-only">Icon description</span>
                                                </button>
                                            </td>
                                            :
                                            <td className="px-6 py-4 flex justify-center items-center">
                                                <button type="button" className="text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm p-2.5  text-center mr-2 mb-2 dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-900"
                                                    onClick={() => { handleUnblock(obj._id) }} >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                    </svg>
                                                    <span className="sr-only">Icon description</span>
                                                </button>
                                            </td>
                                        }
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
                <nav className="flex items-center justify-between p-3 mt-4" aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">{pagination?.current * pagination?.limit}</span> of <span className="font-semibold text-gray-900 dark:text-white">{pagination?.count}</span></span>
                    <ul className="inline-flex items-center -space-x-px">
                        {pagination?.previous ?
                            <>
                                <li>
                                    <a onClick={() => { getTutorsDetails(pagination?.current - 1) }} className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span className="sr-only">Previous</span>
                                        <BsChevronLeft size={19} />
                                    </a>
                                </li>
                                <li>
                                    <a onClick={() => {getTutorsDetails(pagination?.current - 1) }} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{pagination?.current - 1}</a>
                                </li>
                            </>
                            :
                            <li>
                                <a href="#" className="block px-3 py-2 ml-0 leading-tight text-gray-300 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white pointer-events-none ">
                                    <span className="sr-only">Previous</span>
                                    <BsChevronLeft size={19} />
                                </a>
                            </li>
                        }

                        <li>
                            <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{pagination?.current}</a>
                        </li>

                        {pagination?.next ?
                            <>
                                <li>
                                    <a onClick={() => { getTutorsDetails(pagination?.current + 1) }} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{pagination?.current + 1}</a>
                                </li>

                                <li >
                                    <a onClick={() => { getTutorsDetails(pagination?.current + 1) }} className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span className="sr-only">Next</span>
                                        <BsChevronRight size={19} />
                                    </a>
                                </li>
                            </> :
                            <li className='pointer-events-none'>
                                <a className="block px-3 py-2 leading-tight text-gray-200 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only">Next</span>
                                    <BsChevronRight size={19} />
                                </a>
                            </li>
                        }
                    </ul>
                </nav>


        
       </div>
    </div>

  )
}

export default TutorList