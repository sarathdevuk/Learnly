import jwt from 'jsonwebtoken' 
import Tutor from '../models/tutorModel.js'
import bcrypt from 'bcrypt'

const secret_key = process.env.SECRET_KEY
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

  // verify the password
  const validPassword = bcrypt.compare(password , tutor.password);

  if (!validPassword) {
    return res.json({ login : false , message : "incorrect password"})
  }

  const token = createToken(tutor._id)

  tutor.password = "empty"
  res.status(200).json({ login : true , token , login : true })
} catch (error) {
 
  res.json({login : false , message : "Internal serverError"})
}

}

export function tutorAuth (req , res) {
  
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
      const tutor = Tutor.findOne({_id :decoded.id , status:true})

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

