import mongoose from "mongoose";
import bcrypt from 'bcrypt' ;

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

tutorSchema.pre("save" , async function (next) {
  this.password = await bcrypt.hash(this.password , 10) 
} )

const TutorModel = mongoose.model("Tutor", tutorSchema)

export default TutorModel
