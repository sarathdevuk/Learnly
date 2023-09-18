import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import {io } from 'socket.io-client'
import './Messenger.scss'
import { fetchAllJoinedGroups } from '../../../Redux/Actions/groupActions'
import { getMessages, sendMessage } from '../../../services/userApi'
import Conversation from '../Converstaion/Conversation'
import Chat from '../Chat/Chat'
import Message from '../Message/Message'
import { IoSend } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import { IoImage } from "react-icons/io5";
import GroupInfo from '../GroupInfo/GroupInfo'



function Messenger() {

  const dispatch = useDispatch()
  const socket = useRef()
  const scrollRef = useRef()
  const [currentChat , setCurrentChat] = useState(null)
  const [messages , setMessages] = useState([])
  const [newMessage , setNewMessage] = useState('')
  const groupData = useSelector(state => state.group) ;
  const user = useSelector(state => state.user) ;
  const [showMessagesDiv , setShowMessagesDiv] = useState(true) ;
  const isMobile = useMediaQuery({ query : "(max-width: 768px)"})
  const [showAbout , setShowAbout] = useState(false);
  const [image , setImage] = useState() ;
  const [title , setTitle] = useState("")


  // filtering groups name
  const filteredGroups = useMemo(() => {
    return groupData.groups.filter(group => {
      return (
        (title === "" || group.name.toLowerCase().includes(title.toLowerCase()))
      )
    })
  },[title , groupData])


  // socket io
  // connecting to socket
  useEffect(()=> {
    socket.current = io(import.meta.env.VITE_SOCKET_URL)
  },[user])

  // join the appropirate room for the current group
  const handleConversation = ( group) => {
    setCurrentChat(group) ;
    socket.current.emit('joinGroup' , group._id)
  }

  //recieve message and disconnect
  useEffect(() => {
    // recieve message
    socket.current.on('recieveMessage' , ({ sender , text , type , image  }) => {
      if(sender._id != user.id) {
        setMessages(messages =>  [...messages , {sender : sender , text , type , image} ])
      }
    })

    // Clean up when the  componant unmounts
    return () => {
      socket.current.disconnect()
    }

  } , [ user ]) 


  // groups and messages
  useEffect(()=> {
    dispatch(fetchAllJoinedGroups())
  },[])


  // get messeges 
  useEffect(() => {
    getMessages(currentChat?._id).then(( response) => {
      setMessages(response.data)
    }).catch((err)=>{
      console.log(err);
    })
     
  } , [currentChat])
  
  // send new Message 
  const handleSubmit= () => {
    if(newMessage != "") {
      const message = {
        text : newMessage ,
        group : currentChat._id,
        sender : {_id : user.id}
      }
      sendMessage(message)
      .then((response) => {
        // sending messages to socketio
        socket.current.emit('sendMessage' , {
          userId : user.id,
          groupId : currentChat._id ,
          text : newMessage
        })
        // update messages
        setMessages([...messages , message])
        setNewMessage('')
      }).catch((err) =>{
        console.log(err);
      })
    }
  }

  // scrolling when new messages load

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour : "smooth" })
  },[messages])

  // submit data when user click enter
  const keyDownHandler = event => {
    if(event.key == 'Enter') {
      event.preventDefault();
      // call submit function here
      handleSubmit();
    }
  }

  return (
    <div className="h-screen w-full flex antialiased text-black bg-white overflow-hidden">
    <div className="flex-1 flex flex-col">
        <main className="flex-grow border-t flex flex-row min-h-0">
            {showMessagesDiv ?
                <section className="z-50 flex flex-col flex-none overflow-auto w-screen group border-r border-l border-[#dee2e7] lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
                    <div className="search-box border-b border-[#dee2e7] p-4 flex-none">
                        <form >
                            <div className="relative">
                                <label>
                                    <input className="rounded-full py-2 pr-6 pl-10 w-full border border-gray-100 focus:border-gray-100 bg-gray-100 focus:bg-gray-100 focus:outline-none text-gray-800 focus:shadow-md transition duration-300 ease-in" type="text" placeholder="Search Groups"
                                        onChange={(event) => { setTitle(event.target.value); }}
                                    />
                                    <span className="absolute top-0 left-0 mt-2 ml-3 inline-block">
                                        <svg viewBox="0 0 24 24" className="w-6 h-6">
                                            <path fill="#bbb" d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                        </svg>
                                    </span>
                                </label>
                            </div>
                        </form>
                    </div>
                    {groupData.groups.length && filteredGroups.length ?
                        <div className="contacts flex-1 overflow-y-scroll">
                            {filteredGroups.map((group, index) => (
                                <div key={index} onClick={() => { handleConversation(group); setShowAbout(false) }}>
                                    <Conversation isMobile={isMobile} setshowMessagesDiv={setShowMessagesDiv} group={group} />
                                </div>
                            ))}
                        </div>
                        :
                        <div className='w-full h-full flex justify-center items-center'>
                            No Joined Groups.
                        </div>
                    }
                </section>
                : ""}
            {currentChat ?
                <>
                    {showAbout ?
                        <GroupInfo setShowAbout={setShowAbout} currentChat={currentChat} groupData={groupData} setCurrentChat={setCurrentChat} />
                        :
                        <section className="flex flex-col flex-auto pb-12 sm:pb-0">
                            <Chat isMobile={isMobile} setShowAbout={setShowAbout} setshowMessagesDiv={setShowMessagesDiv} currentChat={currentChat} />
                            <div className="chat-body p-4 flex-1 overflow-y-scroll">
                                {currentChat && messages.map((message, index) => {
                                    return (
                                        <div key={index} ref={scrollRef}>
                                            <Message message={message} currentChat={currentChat} own={user.id === message.sender._id} user={user} />
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="chat-footer border-t flex-none">
                                <div className="flex flex-row items-center p-4">
                                    {/* {image ? <SendImageModal image={image} setImage={setImage} socket={socket.current} group={currentChat} user={user} setMessages={setMessages} /> : ""} */}
                                    <button type="button" className="flex flex-shrink-0 focus:outline-none mx-2  text-blue-600 hover:text-blue-700 w-6 h-6">
                                        <div class=" text-xs absolute   font-bold  rounded-full w-10 h-10  text-white flex justify-center items-center   float-left   overflow-hidden cursor-pointer">
                                            <input type="file" name="photo" class="absolute inset-0  opacity-0 cursor-pointer" onChange={(e) => { setImage(e.target.files[0]) }} />
                                        </div>
                                        <IoImage size={22} />
                                    </button>
                                    <div className="relative flex-grow">
                                        <label>
                                            <input className="rounded-full py-2 pl-3 pr-10 w-full border border-gray-100 focus:border-gray-100 bg-gray-100 focus:bg-gray-100 focus:outline-none text-black focus:shadow-md transition duration-300 ease-in" type="text" value={newMessage} placeholder="Message"
                                                onChange={(e) => { setNewMessage(e.target.value) }}
                                                onKeyDown={keyDownHandler}
                                            />
                                            <button type="button" className="absolute top-0 right-0 mt-2 mr-4 flex flex-shrink-0 focus:outline-none  text-blue-600 hover:text-blue-700 w-6 h-6">
                                                <BsEmojiSmile size={23} />
                                            </button>
                                        </label>
                                    </div>
                                    <button onClick={handleSubmit} type="button" className="flex flex-shrink-0 focus:outline-none mx-2 h-9 w-9 bg-blue-600 text-white  justify-center items-center rounded-full">
                                        <IoSend size={20} />
                                    </button>
                                </div>
                            </div>
                        </section>}
                </>
                :
                <div className='w-full flex justify-center items-center'>
                    No conversation selected.
                </div>}
        </main>
    </div>
</div>
  )
}

export default Messenger