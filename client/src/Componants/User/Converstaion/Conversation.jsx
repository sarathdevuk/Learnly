
function Conversation({isMobile , group , setShowMessagesDiv }) {
  return (
<div onClick={() => { isMobile ? setShowMessagesDiv(false) :"" }} className="flex justify-between items-center p-3 border-b border-[#dee2e7] hover:bg-gray-100 relative cursor-pointer">
          <div className="w-16 h-16 relative flex flex-shrink-0">
              <img className="rounded-full w-full h-full object-cover" src={import.meta.env.VITE_SERVER_URL+group.image.path}  />
              {/* <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                  <div className="bg-green-500 rounded-full w-3 h-3" />
              </div> */}
          </div>
          <div className="flex-auto min-w-0 ml-4 mr-6  group-hover:block">
              <p className="font-bold">{group.name}</p>
              {/* <div className="flex items-center text-sm font-bold">
                  <div className="min-w-0">
                      <p className="truncate">Hey, Are you there?</p>
                  </div>
                  <p className="ml-2 whitespace-no-wrap">10min</p>
              </div> */}
          </div>
          {/* <div className="bg-blue-700 w-3 h-3 rounded-full flex flex-shrink-0 hidden md:block group-hover:block" /> */}
      </div>  )
}

export default Conversation