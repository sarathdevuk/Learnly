import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({
  total : {
    type : Number ,
    required : true
  },
  user :{
    type : mongoose.Schema.Types.ObjectId ,
    ref: 'User',
    required : true ,
  },
  course :{
    type : mongoose.Schema.Types.ObjectId ,
    ref: 'Course',
    required : true ,
  },
  tutor : {
    type : mongoose.Schema.Types.ObjectId ,
    ref: 'Tutor',
    required : true ,
  },
  address: {
    type : {} ,
    required : true ,
  },
  purchase_date: {
    type : Date ,
    required: false 
  },
  status : {
    type : Boolean ,
    default: false ,
    required: true 
  },
})

const OrderModel = mongoose.model("Order", OrderSchema)

export default OrderModel
