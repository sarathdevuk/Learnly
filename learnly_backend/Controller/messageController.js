import Message from "../models/messageModel.js";


// Creating message
export const createMessage = async( req , res) => {
  try {
    const { text , group } = req.body 
    console.log( text , "text ++++++++++");

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
   if(req.params.groupId) {

     const messages = await Message.find({ group : req.params.groupId}).populate('sender') 
     console.log("getmessages++++++++++++" , messages);
     if(messages) {
       res.status(200).json(messages);
      }else{
        throw new Error("No message Found")
      }
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: false, message: err.message });
  }
}

// Upload image
export const sendImage = async (req , res) => {
  try {
    req.files.image[0].path = req.files.image[0].path.substring('public'.length)
    if(req.files) {
      const newMessage =  new Message({
        group:req.body.group ,
        sender : req.userId,
        type:'file',
        text : req.body.text ,
        image : process.env.BASE_URL + "/" + req.files.image[0].path
      })

      const savedMessage = await newMessage.save() ;
      res.status(200).json({ group : savedMessage.group , sender : { _id : savedMessage.sender } , 
      text : savedMessage.text , type :savedMessage.type , image : savedMessage.image })
    }else {
      throw new Error("image is not provided")
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: false, message: err.message });
  }
}