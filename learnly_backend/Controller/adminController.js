import Admin from "../models/adminModel.js"
import jwt from "jsonwebtoken" ;
import bcrypt from "bcrypt";
import Tutor from '../models/tutorModel.js'

const maxAge = 3 *24 * 60 * 60 ;
const secret_key = process.env.JWT_SECRET_KEY;


const createToken = (id) => {
  return jwt.sign({id} , secret_key , {
    expiresIn : maxAge
  })
}


export async function AdminLogin (req , res) {

  const {email , password } = req.body;
  console.log(req.body);
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
    // creating token with adminid
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


// check admin logged in 
export async function authAdmin (req,res) {
  try {
    const authHeader = req.headers.authorization;
  console.log(authHeader, "auth head");
  if(authHeader) {

    // seperating bearer and token and taking the token 
    const token = authHeader.split(' ')[1];
    jwt.verify(token , secret_key , async(err , decoded )=>{
    
      if(err) {
        res.json({ status: false, message: "Unauthorized" })
      }else {
        // finding the admin with the decoded id
        const admin = Admin.findById({_id : decoded.id });
        if (admin) {
          res.json({ status: true, message: "Authorized" });

      } else {
          res.json({ status: false, message: "Admin not exists" })

      }
      }


    })
  }else {
    res.json ({ status : false , message : "Admin not exist "})
  }
  } catch (error) {
    console.log(error);
  }

}



export async function getAllTeachers(req, res) {

  try {
    const tutor =  await Tutor.find({} ,{password: 0 })
     res.status(200).json({status : true , tutor})
  } catch (error) {
    res.status(500).json({created : false , message:"" })
  }
}