import jwt from 'jsonwebtoken' 
import Tutor from '../models/tutorModel.js'
import bcrypt from 'bcrypt'

const secret_key = process.env.JWT_SECRET_KEY
const maxAge = 3* 24 * 60 * 60; 


// create a jwt token 
const createToken = (id)=> {
  return jwt.sign({id} , secret_key ,{
    expiresIn : maxAge
  });
}


export async function tutorLogin (req, res) {

try {
  const { email , password } = req.body ;

  const tutor = await Tutor.findOne ({email : email })
  
  if(!tutor) {
    return res.json({ login : false , message :"User not Exist "})
  }

  if(!tutor.status) {
    return res.json({login: false , message : "Sorry You are Banned"})
  }
    

  // verify the password
  const validPassword = await bcrypt.compare(password , tutor.password);
  console.log("valid" , validPassword);

  if (!validPassword) {
    return res.json({ login : false , message : "incorrect password"})
  }
  console.log("secret" ,secret_key);
  // Create a jwt token with tutor id 
  const token = createToken(tutor._id)
  
  tutor.password = "empty"
  res.status(200).json({ login : true , token , tutor })
} catch (error) {
 console.log(error);
  res.json({login : false , message : "Internal serverError"})
}

}

export function tutorAuth (req , res) {
  console.log("tutor auth ro");
try {
  const authHeader = req.headers.authorization ;
  if (!authHeader) {
    return res.json({status : false , message : "Not Authorized" })
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token , secret_key , async(err , decoded) => {
    if(err) {
      res.json({ status : false , message : "Permission not allowed"})
    }else {
      const tutor =await Tutor.findOne({_id :decoded.id , status:true})

      if (tutor){
        res.json({status : true , message : " Authorized"})
      }else {
        res.json({status : false , message : "tutor not exists"})
      }
    }
  });
} catch (err) {
  res.json({ status : false , message : err.message})
}

}


export async function changePassword (req , res ) {
    
 try {
  const {oldpassword ,  password} = req.body ;
   
  if(!oldpassword , !password){
    throw new Error("All fields are mandatory")
  }

  // find tutor with id 
  let tutor = await Tutor.findOne({_id : res.tutorId})
  if(tutor) {
    // verifying the old password
    const validPassword = await bcrypt.compare(oldpassword , tutor.password)
    if(!validPassword) {
      throw new Error("Incorrect Old password");
    }

    // creating new hashed password
    const newPassword = await bcrypt.hash(password  , 10)  

    // updating that hashed password
     Tutor.updateOne({_id : res.tutorId } , {
      $set : { password : newPassword  }
    }).then(() => {
      res.status(200).json({status : true , message : "Password updated Successfully"})
    })

  }else{
    throw new Error("Tutor Not exist ")
  }
 } catch (error) {
  res.json({ status : false , message : error.message})
 }

}

export async function addCours (req ,res) {
  
}
