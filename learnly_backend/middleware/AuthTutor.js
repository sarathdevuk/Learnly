import Tutor from "../models/tutorModel";
import jwt, { decode } from 'jsonwebtoken';
const secret_key = process.env.JWT_SECRET_KEY;

export async function verifyTutorLogin (req , res, next ) {
  console.log("verifyTutorLogin");
    try {
      const authHeader = req.headers.authorization ;
      if(authHeader) {
        const token = authHeader.split(' ')[1];
  
        jwt.verify(token , secret_key , async(err , decoded) => {
          if(err) {
           res.json({status: false , message : "Permission not allowed" });
          }else{
            console.log(decoded,"decode");
            const tutor = await Tutor.findOne({_id : decoded.id})
  
            if(tutor) {
              res.teacherId = decoded.id
              next()
            }else{
              console.log("err");
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