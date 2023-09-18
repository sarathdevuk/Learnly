// import io from 'socket.io'
import {Server} from 'socket.io'
import User from '../models/userModel.js'

const io = new Server();

const socketapi = {
  io : io
};

io.on('connection' , (socket) => {
  console.log("A user Connected"); 

  // join group
  socket.on('joinGroup' , groupId => {
    console.log(`Client joined group ${groupId} `);
    socket.join(groupId);
  })

  // send message
  socket.on('sendMessage' , async({ userId , groupId , text}) => {
    console.log('Send message');
    const sender = await User.find({_id : userId } , {firstName:1 , picture :1})
    io.on(groupId).emit('recieveMessage' , { sender : sender[0] , groupId , text  } )
  })

  //send image
  socket.on("sendImage" , async(data) => {
    console.log("sendImage");
    let sender = await User.find({ _id : data.sender} , {firstName :1 , picture : 1}) ;
    io.to(data.group).emit("recieveMessage" , { sender : sender[0], groupId : data.group , type  : data.type , image : data.image, text : data.text })
  })

  // Clean up when the Client disconnects 
  socket.on('disconnect' , () => {
    console.log('Client disconnected');
  })
  
})

export default socketapi ;