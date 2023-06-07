import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema(
{
  firstName : {
    type : String , 
    required : [true , "Tutor FirstName is required"],
  },
  lastName : {
    type : String , 
    required : [true , "Tutor lastName is required"]
  },
  email : {
    type : String ,
    required : [true , "tutor email is required"]
  },
  phone : {
    type : String ,
    requird : [true , "Tutor Phone No is required"],
    unique : true
  },
  place : {
    type : String ,
  },
  password : {
    type: String ,
  },
  login : {
    type : Boolean,
    default : false
  },
  status : {
    type : Boolean,
    default : true 
  },
  about : {
    type : String, 
  }

},
{
  timestamps : true
}
)

const TutorModel = mongoose.model("Tutor", tutorSchema)

export default TutorModel
