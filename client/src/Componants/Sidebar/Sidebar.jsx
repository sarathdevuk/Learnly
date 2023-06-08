import React ,{useState , useEffect} from "react";
import "./Sidebar.scss";
import { useDispatch , useSelector } from "react-redux";
// import { setUserDetails } from "../../Redux/Features/userSlice";
// import { setSidebar } from "../../Redux/Features/adminSidebarToogle";
import { useNavigate } from "react-router-dom";
import { setSidebar } from "../../Redux/Features/adminSidebarToogle";


function Sidebar ( props ) {
  const [sidebarLinks , setSidebarLinks] = useState([]);
  const sidebarToogle = useSelector((state) => state.adminSidebarToogle);
  const dispatch = useDispatch () ;
  const navigate = useNavigate()

  useEffect(() => {
    
    function handleResize () {
      if(window.innerWidth > 760) {
        dispatch(setSidebar(true))
      }
      if(window.innerWidth < 400 ) {
        dispatch(setSidebar(false))
      }
    }

    if(props.admin) {
      setSidebarLinks(adminLinks);
    }else {
      setSidebarLinks(tutorLinks)
    }
  
    
  }, [])
  


  return (
    <div className={`${sidebarToogle.sidebar ? "sidebar" :" close-sidebar admin-page-inclose "} z-40 fixed flex flex-col top-0 left-0 w-64 bg-white h-full border-r`}>

      <div className="flex items-center justify-center h-14 border-b">
        <div>Learnly</div>
      </div>

      <div className="overflow-y-auto overflow-x-hidden flex-grow">
        <ul className=" flex flex-col py-4 space-y-1" >
          {
            sidebarLinks.map((obj , index) => {
              return(
                <>
                <li className="p-1 md:px-3" key={index}>
                  <div className="flex flex-row items-center h-8">
                    <div className="text-sm tracking-wide font-semibold text-grey-500" > {obj.title} </div>
                  </div>

                </li>
                {
                  obj.links.map((link , index) => {
                    return(
                      <li key={index}>
                        <a onClick={() => {navigate(link.link)}} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"  >
                        <span className="inline-flex justify-center item-center ml-4">
                        {link.icon}
                        </span>
                        <span className="ml-2 sidebar-label text-sm tracking-wide truncate">{link.subTitle}</span>
                        </a>
                      </li>
                    )
                  })
                }
                </>
              )
            })
          }

        </ul>
      </div>
    </div>
  )

}

export default Sidebar ;