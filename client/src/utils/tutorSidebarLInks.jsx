import { BiHomeAlt, BiLogOut } from "react-icons/bi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { AiOutlineFileAdd } from "react-icons/ai";

const tutorLinks = [
    {
        title: 'Home',
        links: [
            { subTitle: "Dashboard", link: "/tutor/dashboard", icon: <BiHomeAlt size={22} /> },
        ]
    },
    {
        title: 'Course',
        links: [
            {
                subTitle: "Add Course", link: "/tutor/add-course", icon: <AiOutlineFileAdd size={22} /> },
            { subTitle: "List Courses", link: "/tutor/course", icon: <HiOutlineClipboardList size={22} /> }
        ]
    },

    {
        title: "Settings",
        links: [
            { subTitle: "Logout", link: "/tutor/course", icon: <BiLogOut size={22} /> }
        ]
    }



];

export default tutorLinks;