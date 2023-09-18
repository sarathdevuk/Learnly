// import io from 'socket.io'
import {Server} from 'socket.io'
// import User from '../models/userModel.js'

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
  

  // Clean up when the Client disconnects 
  socket.on('disconnect' , () => {
    console.log('Client disconnected');
  })
  
})

export default socketapi ;