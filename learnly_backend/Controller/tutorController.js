import jwt from 'jsonwebtoken' 
import Tutor from '../models/tutorModel.js'
import bcrypt from 'bcrypt'

const secret_key = process.env.SECRET_KEY
const maxAge = 3* 24 * 60 * 60; 

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