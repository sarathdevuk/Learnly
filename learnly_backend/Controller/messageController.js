import Message from "../models/messageModel.js";


// Creating message
export const createMessage = async( req , res) => {
  try {
    const { text , group } = req.body 
    const newMessage = new Message({ 
      group,
      sender: req.userId ,
      type : 'text' ,
      text
    })
    const savedMessage =await newMessage.save()
    res.status(200).json(savedMessage)

  } catch (err) {
    res.status(404).json({ status: false, message: err.message })
  }
}

// Get messages
export const getMessages = async (req , res) =>{
  try {
   
    const messages = await Message.find({ group : req.params.groupId}).populate('sender') 
      console.log(messages);
    if(messages) {
      res.status(200).json(messages);
    }else{
      throw new Error("No message Found")
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: false, message: err.message });
  }
}