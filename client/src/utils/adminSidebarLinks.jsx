
import { BiHomeAlt, BiGroup } from "react-icons/bi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { HiOutlineClipboardList } from "react-icons/hi";
// import { CgCommunity } from "react-icons/cg";
// import { AiOutlineUsergroupAdd } from "react-icons/ai";

const adminLinks = [
  {
    title : 'Home' ,
    links : [
      { subTitle : "Dashboard" , link : "/admin/dashboard" , icon : <BiHomeAlt size={22} />},
    ]
  },
  {
    title : 'Tutors',
    links : [
      {subTitle : "Add Tutor" , link : "/admin/add-tutor" , icon : <FaChalkboardTeacher size={22}/> },
      {subTitle : "List Tutor" , link : "/admin/tutors" , icon : <HiOutlineClipboardList size={22}/> }
    ]
  },
  {
    title : 'Course' ,
    links : [
      {subTitle : "Courses" , link : "/admin/course" , icon : <HiOutlineClipboardList size={22}/>}
    ]
  },
  {
    title : 'User' ,
    links : [
      {subTitle : "Users" , link : "/admin/users" , icon : <HiOutlineClipboardList size={22}/>}
    ]
  },

]


export default adminLinks ;
