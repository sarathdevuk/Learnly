import React from 'react'
import { AiFillMessage } from "react-icons/ai";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { IoExitOutline } from "react-icons/io5";
// import { exitGroup } from '../../services/userApi';
import { useDispatch } from 'react-redux';
import { fetchAllJoinedGroups } from '../../Redux/Actions/groupActions';
import { BsArrowLeft } from "react-icons/bs";

function GroupInfo({ setShowAbout, currentChat, groupData, setCurrentChat }) {
    // const dispatch = useDispatch();
    
    const handleOnclick=()=>{
        swal({
            text: `Exit  "${currentChat?.name}"  group ?`,
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    // exitGroup(currentChat._id)
                    // .then((response)=>{
                    //     setShowAbout(false);
                    //     setCurrentChat(null);
                    //     dispatch(fetchAllJoinedGroups());
                    // })
                    // .catch((response)=>{
                    //     console.log(response);
                    // })
                }
            });
    }
    return (
        <div className="w-full p-3 bg-white">
            <div className='flex justify-start items-center mr-4 cursor-pointer' onClick={() => {
                setShowAbout(false);
            }}>
                <BsArrowLeft size={19} />
            </div>
            <div className="flex flex-col items-center mt-6">
                <img src={currentChat ? import.meta.env.VITE_SERVER_URL + currentChat.image.path : ""} alt className="w-24 h-24 rounded-full" />
                <span className="text-2xl mt-1 text-gray-700">{currentChat ? currentChat.name : ""}</span>
                <span className="text-sm text-gray-600"><span>{currentChat.members.length}</span> Members</span>
            </div>
            <div className="mt-6 flex justify-evenly">
                <div className="flex flex-col items-center p-3">
                    <span className="bg-blue-200 w-16 h-16 text-blue-500 flex rounded-full items-center justify-center">
                        <AiFillMessage size={20} />
                    </span>
                    <span className="text-gray-600 mt-2">Chat</span>
                </div><div className="border-r-2 border-gray-300" />
                <div className="flex flex-col items-center p-3">
                    <span className="bg-blue-200 text-blue-500 w-16 h-16 flex rounded-full items-center justify-center">
                        <BsFillCameraVideoFill size={20} />
                    </span>
                    <span className="text-gray-600 mt-2">Video Call</span>
                </div>
            </div>
            
            <div className="flex flex-col space-y-4 mt-3">
                <label htmlFor="view-all" className="text-gray-800 font-semibold text-sm">Attachments</label>
                <ul className="p-1 flex jusutify-between space-x-1">
                    <li className="h-16 w-1/4 bg-blue-200 flex items-center justify-center text-blue-600 text-xs rounded-md">PDF</li>
                    <li className="h-16 w-1/4 bg-blue-200 flex items-center justify-center text-blue-600 text-xs rounded-md">Vieo</li>
                    <li className="h-16 w-1/4 bg-blue-200 flex items-center justify-center text-blue-600 text-xs rounded-md">MP3</li>
                    <li className="h-16 w-1/4 bg-blue-200 flex items-center justify-center text-blue-600 text-xs rounded-md">Image</li>
                </ul>
            </div>
            <div onClick={handleOnclick} className="flex flex-col justify-center items-center mt-6 shadow-sm border rounded">
                <button type="button" className="py-3 flex items-center justify-center  text-red-600 px-2 ">
                    <IoExitOutline size={20} />
                    <span  className='ml-5'>Exit group</span>
                </button>
            </div>
            
        </div>

    )
}

export default GroupInfo