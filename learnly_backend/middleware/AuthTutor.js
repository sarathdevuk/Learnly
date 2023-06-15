import Tutor from "../models/tutorModel.js";
import jwt from 'jsonwebtoken';
const secret_key = process.env.JWT_SECRET_KEY;

// check the admin logged in 
export async function verifyTutorLogin (req , res, next ) {
  console.log("verifyTutorLogin");
    try {
      // getting token from headers
      const authHeader = req.headers.authorization ;
      if(authHeader) {
        const token = authHeader.split(' ')[1];

     // verify that token with the secret_key ;
        jwt.verify(token , secret_key , async(err , decoded) => {
          if(err) {
           res.json({status: false , message : "Permission not allowed" });
          }else{

        // finding the tutor with the decoded id

            const tutor = await Tutor.findOne({_id : decoded.id})
  
            if(tutor) {
        // if tutor exists pass tutor id to res.tutor id 
            res.tutorId = decoded.id
              next()
            }else{
             
              res.json({ status: false, message: "Tutor not exists" });
            }
          }
        })
        
        }
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, message: "Internal server error" })
    }
}