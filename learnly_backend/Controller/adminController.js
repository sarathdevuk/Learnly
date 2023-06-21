import Admin from "../models/adminModel.js"
import jwt from "jsonwebtoken" ;
import bcrypt from "bcrypt";
import Tutor from '../models/tutorModel.js'
import User from '../models/userModel.js'
import cryptoRandomSting from 'crypto-random-string'
import { sendEmail } from "../helpers/sendEmail.js";
import Course from '../models/courseModel.js'


const maxAge = 3 *24 * 60 * 60 ;
const secret_key = process.env.JWT_SECRET_KEY;

// Creating jwt token with secret key
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
    // hiding password and pass the admin only
    admin.password = "empty"
    res.status(200).json({admin , token , login : true });

  } catch (error) {
    console.log(error);
    res.json({message: "Internal Server Error"})
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


export async function addTutor (req, res) { 
  console.log("add Tutor");

try {
  const {firstName , lastName , email ,  phone , place  } = req.body;

  if(!firstName , !lastName , !email , !phone , !place) {
    throw new Error("All fields are mandatory")
  }

// creating random password for tutor 
  const randomPassword = cryptoRandomSting({length:6 , type: 'numeric'})
  console.log(randomPassword);

  const tutor = await Tutor.findOne({
    $or:[{email:email} , {phone : phone }]
  }); 

  console.log(tutor  ,"tutoeor");

  if(tutor){
   return res.json({created:false , message :"Tutor already exists"});
  }
 
// create newTutor with random pass
  const newTutor = await Tutor.create({
    firstName,
    lastName,
    email ,
    password : randomPassword ,
    phone , 
    place

  })

  console.log(newTutor);
  // here send the password to the tutor via email 
    const emailSend = await sendEmail(email , randomPassword);

    if(emailSend.status) {
        res.json({ created : true , message : " Tutor Details added successfully"})
    }
    else {
      res.json({created : false ,  message : "Email not send" })
    }
} catch (error) {
  console.log(error);
  res.status(500).json("internal server error") ;
}

}



export async function getAllTutors(req, res) {
  
  try {
    const tutors =  await Tutor.find({} ,{password: 0 })
    console.log("get tutors ,  " , tutors);
     res.status(200).json({status : true , tutors})
  } catch (error) {
    res.status(500).json({created : false , message:"" })
  }
}

export async function blockTutor (req , res){
  try {

    // find tutor with id and update the status
    const tutor = await Tutor.findByIdAndUpdate(req.params.id ,{$set : {status: false}}, {new: true} );
    if(tutor){
      res.status(200).json({ status : true , message : "Tutor Blocked Successfully"})
    }else {
      res.status(404).json({ status : false , message : "Something went wrong"})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ status : false , message: "Internal server Error"})
  }
}


export async function unBlockTutor (req , res) {
  try {
    // find tutor with id and update the status
    const tutor = await Tutor.findByIdAndUpdate(req.params.id , 
      {$set : {status : true}} , {new : true} )

      if(tutor){
        res.status(200).json({ status : true , message : "Tutor Unblocked Successfully"})
      }else{
        res.status(404).json({status : false , message : "Something went wrong "})
      }

  } catch (error) {
  console.log(error);
  res.status(500).json({status : false , message : "Internal server error" })    
  }
}



export async function getAllUsers (req , res) {  
 
  try {
     const users =await User.find()

     if (users) {
       res.json({ status: true , users }) 
     }else {
    return res(404).json({status:false , message: "No user found"})
  }
 } catch (error) {
  res.status(500).json({status : false , message : "Internal server Error"})
 }

}


export async function blockUser (req, res) {
  try {
    // finding user with id and change their status 
  const user =await User.findByIdAndUpdate(req.params.id ,  
    {$set : {status : false}} , {new: true});

    if(user) {
      console.log("suerersfs" , user);
      res.status(200).json({status : true , message : "user Blocked successfully"})
    }else {
      res.status(500).json({status : false , message : "User not found"})
    }

  } catch (error) {
    res.status(500).json({status : false , message : " Internal Sever Error"})
  }
}


export async function unBlockUser (req, res) {
  
  try {

    // finding user with id and change their status 
  const user = await User.findByIdAndUpdate(req.params.id ,  
    {$set : {status : true}} , {new: true});

    if(user) {
      res.status(200).json({status : true , message : "user unBlocked successfully"})
    }else {
      res.status(500).json({status : false , message : "User not found"})
    }

  } catch (error) {
    res.status(500).json({status : false , message : " Internal Sever Error"})
  }
}



export async function changeCourseStatus (req , res) {
  
  try {
    
    const courseId = req.params.courseId
    const { status } = req.params ;

    let updatedData = {} ;

    switch(status) {
      case 'block' : 
          updatedData.status = false;
        break;
      case 'unblock' : 
          updatedData.status = true;
      break ;
      default : 
      return res.status(400).json({status : false, message : 'Invalid status'})
    }


    const response = await Course.updateOne({ _id : courseId} , {$set : updatedData})
    if(response.modifiedCount ===1) {
      const message = status === 'block' ? 'Course Blocked Successfully' : 'Course Unblocked Successfully'
      return res.status(200).json({ status : true , message })
    }

    res.status(404).json({ status : false , message : 'Course not found'}) ;

  } catch (error) {
    res.status(500).json({ status : false , message : 'Internal Server Error'}) ;
    
  }

}