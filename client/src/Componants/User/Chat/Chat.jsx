import { BsArrowLeft } from 'react-icons/bs'

function Chat ({ setShowAbout , currentChat , isMobile , setShowMessagesDiv }) {


  return(
    <div className="chat-header  px-6 py-4 flex flex-row flex-none justify-between items-center border-b">
    <div className="flex">
        {isMobile ?
            <div className='flex justify-center items-center mr-4' onClick={() => {
                setShowMessagesDiv(true)
            }}>
                <BsArrowLeft size={19} />
            </div> : ""}
        <div className='flex cursor-pointer' onClick={() => { setShowAbout(true) }} >
            <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
                <img className=" rounded-full w-full h-full object-cover" src={currentChat ? import.meta.env.VITE_SERVER_URL + currentChat.image.path : ""} />
            </div>
            <div className="text-sm cursor-pointer flex justify-center items-center">
                <p className="font-bold">{currentChat ? currentChat.name : ""}</p>
                {/* <p>Active 1h ago</p> */}
            </div>
       </div>
    </div>
    <div className="flex">
        {/* <a href="#" className="block rounded-full hover:bg-gray-700 text-blue-500 bg-gray-800 w-10 h-10 p-2">
          <BsFillTelephoneFill size={23} />
      </a>
      <a href="#" className="block rounded-full hover:bg-gray-700 text-blue-500 bg-gray-800 w-10 h-10 p-2 ml-4">
          <BsCameraVideoFill size={23} />
      </a> */}
        {/* <a href="#" className="block rounded-full hover:bg-gray-700 text-gray-500 bg-gray-100 w-10 h-10 p-2 ml-4">
            <BsFillInfoCircleFill size={23} />
        </a> */}
    </div>
</div>
  )
}

export default Chat;