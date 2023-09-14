import mongoose, { mongo } from 'mongoose'

const communitySchema = new mongoose.Schema({ 
  name : {
    type: String , 
    required : true ,
    unique : true
  },
  type: {
    type : String,
    required : true 
  },
  about : {
    type : String ,
    required: true 
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId ,
    ref : "User" ,
    required : true
  } ,
  description: {
    type : String 
  },
  members : {
    type : [mongoose.Schema.Types.ObjectId] ,
    ref : "User"
  },
  groups : {
    type : [mongoose.Schema.Types.ObjectId] ,
    ref : "Groups"
  } ,
  posts : {
    type : [ 
      {
        user : {type : mongoose.Schema.Types.ObjectId} ,
        createdAt : { type : Date , default : Date.now} ,
        message : {type : String} ,
        image : { type : Object , default :{}}
      }
    ]
  },
  image : {
    type : Object,
    required : true
  },
  status : {
    type : Boolean ,
    default : true ,
  }
} , { 
  timestamps : true 
})

const commmunityModel = mongoose.model("Communitys" , communitySchema) 

export default commmunityModel