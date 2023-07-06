import jwt from 'jsonwebtoken' 
import Tutor from '../models/tutorModel.js'
import User from '../models/userModel.js'
import Order from '../models/orderModel.js'
import Course from '../models/courseModel.js'
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
  // getting the credentials from the request body
  const { email , password } = req.body ;

  // Checking in the database with the email of the tutor 
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

// Function for checking the Authorization
export function tutorAuth (req , res) {

try {
  // getting the token from the headers
  const authHeader = req.headers.authorization ;
  if (!authHeader) {
    // return if there is no token in headers
    return res.json({status : false , message : "Not Authorized" })
  }

  //spliting the  Bearer token  and then selecting the token 
  const token = authHeader.split(' ')[1];

  // verifying the jwt token with secret key 
  jwt.verify(token , secret_key , async(err , decoded) => {
    if(err) {
      res.json({ status : false , message : "Permission not allowed"})
    }else { 

      // finding the tutor with the decoded id
      const tutor =await Tutor.findOne({_id :decoded.id , status:true})

      if (tutor){ 
        // if tutor found then return a success response
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



// Change Tutor Password 
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


// getting dashboard details
export async function getDashboardDetails (req ,res) {
  try {
  
    // Finding the total User count 
  let studentCount = await User.find().count()
  // find the total orders course of that particular tutor
  let orderCount = await Order.find({tutor:res.tutorId}).count()
  // finding the total course count of that tutor
  let courseCount= await Course.find({ tutor: res.tutorId}).count();

    let revanueDetails = await Order.aggregate([
      { 
        $group: {
          _id : {$month : "$purchase_date"},
          total : {$sum : "$total"}
        }
      },
      {
        $project :{
          _id :0 ,
           month :"$_id",
           total: 1

        }
      },
      {
        $sort : {
          month:1
        }
      },
      {
        $group:{
          _id:null,
          data: { $push : "$total"}
        }
      },
      {
        $project: {
          _id : 0,
          data : 1 ,
        }
      }

    ]) 
    res.status(200).json({status: true ,  studentCount , orderCount , courseCount , revanueDetails: revanueDetails[0].data })

  } catch (err) {
    res.status(404).json({ status: false, message: err.message });
  }
}
