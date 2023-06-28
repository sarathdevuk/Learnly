import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const secret_key = process.env.JWT_SECRET_KEY ;

// check user logged in 
export async function verifyUser (req , res , next) {
  try {
    console.log("verify User");
    // getting the token from request headers
    const authHeader = req.headers.authorization ;
    console.log("authheader",authHeader);
    if(authHeader){
      const token = authHeader.split(' ')[1]

      jwt.verify(token , secret_key , async(err , decoded) =>{
        if(err) {
          res.json({status : fasle , message : "Permission not allowed"})
        }else{

          // finding the user with the decoded id
          const user = await User.findById(decoded.id)

          if(user) {
            // if user exist then pass the user id with the response
            req.userId = decoded.id 
            // after transfer the request to the next function
            next()
          }else {
            res.json({status : false , message: "Tutor not exist"})
          }
        }

      })

    }else{
      res.json({status : false , message : "No token" })
    }
  } catch (error) {
    res.status(500).json({ status: false , message :"Internal server Error"})
  }
}