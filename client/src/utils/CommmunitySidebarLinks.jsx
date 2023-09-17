import { BiHomeAlt } from "react-icons/bi";
import { MdOutlineExplore, MdOutlineMessage } from "react-icons/md";


const CommunitySidebarLink = [
    {
        label: "Home",
        icon: <BiHomeAlt size={22} />,
        to: "/community",
    },
    {
        label: "Explore groups",
        icon: <MdOutlineExplore size={22} />,
        to: "/groups",
    },
    {
        label: "Messages",
        icon: <MdOutlineMessage size={22} />,
        to: "/messages",
    },
    
];

export default CommunitySidebarLink
