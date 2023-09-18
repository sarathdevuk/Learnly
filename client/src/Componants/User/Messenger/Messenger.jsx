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