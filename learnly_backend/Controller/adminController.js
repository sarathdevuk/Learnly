import Admin from "../models/adminModel.js"
import jwt from "jsonwebtoken" ;
import bcrypt from "bcrypt";


const maxAge = 3 *24 * 60 * 60 ;
const secret_key = process.env.JWT_SECRET_KEY;


const createToken = (id) => {
  return jwt.sign({id} , secret_key , {
    expiresIn : maxAge
  })
}


export async function AdminLogin (req , res) {

  console.log("AdminLogin");
  const {email , password } = req.body;

  try {
     
    if(!email || !password  ) {
      return res.json({ message : "All fields are mandatory"});
    }

    const admin = await Admin.findOne({ email:email });
    if(!admin) {
      return res.json({message: "Email not exist " , login: false})
    }

    const validPassword = await bcrypt.compare(password , admin.password)
    if(!validPassword){
      return res.json({message: "Incorrect email or password"})
    }

    const token = createToken(admin._id);
    res.cookie("jwt" , token , {
      withCredentials: true,
      httpOnly : false ,
      maxAge: maxAge *1000

    })

    admin.password = "empty"
    res.status(200).json({admin , token , login : true });

  } catch (error) {
    console.log(error);
  }


 }


 export async function authAdmin (req,res) {
  console.log("req" ,req.headers.authorization );
  // const authHeader = req.headers.authorization ;
  console.log(req.cookies);
  const token = req.cookies.jwt
  if(!token) {
    return res.json({status : false , message: "No Token"})
  }
  const verifiedJWT = jwt.verify(token , secret_key ) ;
  const admin = await Admin.findById (verifiedJWT.id , {password : 0});

  if(!admin) {
    return res.json({status : false , message : "Admin not Exists"});
  }

  return res.json({ status:true , message : "Authorized" })

 }

