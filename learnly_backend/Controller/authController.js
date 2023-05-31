
import User from "../models/userModel.js"
import { sendVerificationCode , verifyOtp } from "../helpers/otpVerification.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
const secret_key = process.env.JWT_SECRET_KEY;
const maxAge = 3 * 24 * 60 * 60; 

let userDetais ;

var salt = bcrypt.genSaltSync(10) ;



const createToken = (id)=> {
  return jwt.sign( { id } , secret_key , {expiresIn : maxAge  } )
}



export async function generateOtp (req , res ){

  try {
  const { email } = req.body

 const user = await User.findOne({email})
  // check the user is exist 
 if(user) {

    return res.json({err: true , message : "Email is already exist try another one"})  

 }else{
  //  send otp to email 
    sendVerificationCode(email, req)
    .then((response) => {
      res.json({ status: true, message: "OTP successfully send" });
      userDetais = req.body;
  }).catch((response) => {
      res.json({ status: false, message: "OTP not send" });
  })
}

} catch (error) {
  console.log(error);
}


}
export async function doSignup (req , res){
  try {

   const verified =  verifyOtp(req.body.otp)
  
   if(verified) {
    const { name , email , phone , password } = userDetais ;

    if(!name , !email , !password , !phone) throw new Error("All fields are mandatory")

    const hashedPassword = bcrypt.hashSync(password , salt)
    
    const user = await User.create({ name , email , password: hashedPassword , phone })

    res.status(201).json({status : true  , message : "Otp verified successfully"}) 

   }else{
    res.json({status : false , message : "Otp does not match "}) ;
   }

    
  } catch (error) {
    console.log(error);
  }
 
 
}

export async function login (req, res) {

  try {
     
    const {email , password} = req.body ;

    if(!email || !password) {
      throw new Error("All fields are required") 
    }

    const user = await User.findOne({email}) ;
    if(user) {

     const validPassword =await bcrypt.compare(password , user.password) 

     if(!validPassword) {
      return res.json({login: false , message : "incorrect password"})
     }
      // creating token using user Id
      const token = createToken(user._id)
      res.status(200).json({user , token , login:true})
     
    } else{
      res.json({login : false , message : "incorrect username or password" } )
    }
 
  } catch (error) {
    console.log(error);
  }

}