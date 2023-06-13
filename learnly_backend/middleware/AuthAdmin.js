import Admin from '../models/adminModel'
import jwt from 'jsonwebtoken' ;
const secret_key = process.env.JWT_SECRET_KEY;


export async function verifyAdminLogin (req , res , next )  {
  const authHeader = req.headers.authorization ;

  if(authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token , secret_key  , async(err , decoded) => {
        if(err) {
          res.json({status : false , message : "Permission not allowed" }) ;
        }else {

          const admin = await Admin.findById(decoded.id) ;
          console.log("admin ", admin);
          if(admin ) {
            next() ;
          }else {
            res.json({status : false , message : "Admin not Exists"})
          }
        }
    })

  }else {
    res.json({ status : false , message : "Token not Provided "})
    next()
  }
}