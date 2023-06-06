import React , {useEffect , useState} from "react";
import "./AdminHeader.scss";
import { useNavigate } from "react-router-dom";



function AdminHeader({ role }) {

  const navigate = useNavigate();
  

  return (
    <div className="p-3" >
     <nav style={{ border: "1px solid #e5e7eb", position: 'fixed', width: '100%', top: '0', left: '0', right: '0' }} className="relative  z-50 px-4 py-4 flex justify-between items-center bg-white">
                <a className="hidden md:flex text-3xl font-bold leading-none" href="#">
                    <h1 className='text-violet-800 text-2xl'>Learnly</h1>
                </a>
                <div className="lg:hidden">
                    <button className="navbar-burger flex items-center text-violet-700 p-3"
                        // onClick={() => { dispatch(setSidebar(!sidebarToogle.sidebar)) }}
                    >
                        <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Mobile menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                        </svg>
                    </button>
                </div>

                <div style={true ? { display: 'block' } : { display: 'none' }} className="z-50 absolute right-2 top-12  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">

                <ul className="py-2" aria-labelledby="user-menu-button">
                     <li>
                  <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    onClick={() => {
                       localStorage.removeItem('adminJwtToken');
                          navigate('/admin')
                             }}
                       >Logout</p>
                       </li>
               </ul>
                </div>
      </nav>

    </div>
  )

}

export default AdminHeader ;