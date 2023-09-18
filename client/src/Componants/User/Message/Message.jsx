import React from 'react' 
import TimeAgo from 'timeago-react';

function Message( {own , message , user} ) {
  return (
    <>{
      own ?
          <>
              {/* <p className="p-4 text-center text-sm text-gray-500">12:40 PM</p> */}
              {message.type === 'file' ?
                  <div className="flex flex-row justify-end mt-3">
                      <div className="messages text-sm text-white grid grid-flow-row">
                          <div className="flex items-center flex-row-reverse group">
                              <p className="p-2  rounded-l-xl rounded-br-xl bg-blue-500 max-w-xs lg:max-w-md">
                                  <div class="flex items-center flex-row-reverse group">
                                      <img class="  w-full max-w-[224px] h-full rounded-lg object-cover" src={message.image} alt="image" />
                                  </div>
                                  {message.text ?
                                      <p className='mt-2 text-white ml-2'>{message.text}</p>
                                      :
                                      null
                                  }
                              </p>
                          </div>
                          <time className="text-right text-black text-[10px] opacity-50 "><TimeAgo datetime={message.createdAt} /></time>
                      </div>
                      {user?.image ?
                      <div className="w-8 h-8 relative flex flex-shrink-0 ml-2">
                              <img className=" rounded-full w-full h-full object-cover" src={user?.image}/>
                      </div>
                      :null}
                  </div>
                  :
                  <div className="flex flex-row justify-end mt-3">
                      <div className="messages text-sm text-white grid grid-flow-row">
                          <div className="flex items-center flex-row-reverse group">
                              <p className="px-6 py-3 rounded-b-full rounded-l-full bg-blue-500 max-w-xs lg:max-w-md">
                                  <span >{message.text}</span></p>
                          </div>
                          <time className="text-right text-black text-[10px] opacity-50 "><TimeAgo datetime={message.createdAt} /></time>
                      </div>
                      {user?.image ?
                          <div className="w-8 h-8 relative flex flex-shrink-0 ml-2">
                              <img className=" rounded-full w-full h-full object-cover" src={user?.image} />
                          </div>
                          : null}
                  </div>
              }
          </>

          :
          <>
              {/* <p className="p-4 text-center text-sm text-gray-500">SAT 2:10 PM</p> */}

              {message.type === 'file' ?
                  <div className="flex flex-row justify-start mt-3">
                      {message.sender?.picture ?
                          <div className="w-8 h-8 relative flex flex-shrink-0 mr-2">
                              <img className=" rounded-full w-full h-full object-cover" src={message.sender?.picture} />
                          </div>
                          : null}
                      <div className="messages text-sm text-white grid grid-flow-row">
                          <div className="flex items-center flex-row-reverse group">
                              <p className="p-2  rounded-r-xl rounded-bl-xl bg-gray-200 max-w-xs lg:max-w-md">
                                  <p className='text-xs text-blue-600 font-semibold text-left mb-2'>{message.sender?.firstName}</p>
                                  <div class="flex items-center flex-row-reverse group">
                                      <img class="  w-full max-w-[224px]  h-full rounded-lg object-cover" src={message.image} alt="hiking" />

                                  </div>
                                  {message.text ?
                                      <p className='mt-2 text-black ml-2'>{message.text}</p>
                                      :
                                      null
                                  }
                              </p>
                          </div>
                          <time className="text-right flex text-black text-[10px] opacity-50 "><TimeAgo datetime={message.createdAt} /></time>
                      </div>
                  </div>
                  :
                  <div className="flex flex-row justify-start mt-3">
                      {message.sender?.picture ?
                          <div className="w-8 h-8 relative flex flex-shrink-0 mr-2">
                              <img className=" rounded-full w-full h-full object-cover" src={message.sender?.picture} />
                          </div>
                          : null}
                      <div className="messages text-sm text-gray-700 grid grid-flow-row gap-2">
                          <div className="flex items-center group">
                              <p className="px-6  py-1 rounded-t-full rounded-r-full bg-gray-100 max-w-xs lg:max-w-md text-gray-800">
                                  <p className='text-xs text-blue-600 font-semibold text-left'>{message.sender?.firstName}</p>
                                  <span className='mt-3'>{message.text}</span>
                              </p>
                          </div>
                          <time className="text-black flex  text-[10px] opacity-50 "><TimeAgo datetime={message.createdAt} /></time>
                      </div>
                  </div>
              }
          </>
  }
  </>
  )
}

export default Message