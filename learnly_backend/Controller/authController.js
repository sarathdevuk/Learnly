
import User from "../models/userModel.js"
import sentOTP from "../helpers/otpVerification.js"



export async function generateOtp (req , res){

 const user = User.findOne({email : req.body.email})

 if(user) {

    return res.json({err: true , message : "Email is already exist try another one"})  

 }else{

    
  

 }




}
export async function doSignup (req , res){

 
 


}