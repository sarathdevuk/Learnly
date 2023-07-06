import User from "../models/userModel.js";
import { sendVerificationCode, verifyOtp } from "../helpers/otpVerification.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import axios from 'axios'


const secret_key = process.env.JWT_SECRET_KEY;
const maxAge = 3 * 24 * 60 * 60;

let userDetails ;

var salt = bcrypt.genSaltSync(10);

const createToken = (id) => {
  return jwt.sign({ id }, secret_key, { expiresIn: maxAge });
};

// post Signup
export async function generateOtp(req, res) {
  console.log("generate otp");
  try {
    const { email } = req.body;
    console.log(req.body);

    const user = await User.findOne({ email });
    // check the user is exist
    if (user) {
      return res.json({
        err: true,
        message: "Email is already exist try another one",
      });
    } else {
      //  send otp to email
      sendVerificationCode(email, req)
        .then((response) => {
          res.json({ status: true, message: "OTP successfully send" });
          userDetails = req.body;
        })
        .catch((response) => {
          res.json({ status: false, message: "OTP not send" });
        });
    }
  } catch (error) {
    console.log(error);
  }
}

// verify otp
export async function doSignup(req, res) {
  try {
    console.log("generate signup");

    const verified = verifyOtp(req.body.otp);

    if (verified) {
      console.log(userDetails);
      const { firstName, lastName, email, phone, password } = userDetails;

      if ((!firstName, !email, !password ))
        throw new Error("All fields are mandatory");

      const hashedPassword = bcrypt.hashSync(password, salt);

      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
      });

      res
        .status(201)
        .json({ status: true, message: "Otp verified successfully" });
    } else {
      res.json({ status: false, message: "Otp does not match " });
    }
  } catch (error) {
    console.log(error);
  }
}

// login 
export async function login(req, res) {
  console.log("generate login");

  try {
    const { email, password } = req.body;
    // console.log(req.body);
    if (!email || !password) {
      throw new Error("All fields are required");
    }

    const user = await User.findOne({ email });
    if (user) {
      console.log(user.status);
      if(!user.status) {
        return res.json({ login : false , message :"Sorry You are banned"})
      }
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.json({ login: false, message: "incorrect password" });
      }
      // creating token using user Id
      // console.log(user._id ,"user id");
      const token = createToken(user._id);
    //   res.cookie("jwt", token, {
    //     withCredential: true,
    //     httpOnly: false,
    //     maxAge: maxAge * 1000
    // })

      res.status(200).json({ user, token, login: true });
    } else {
      res.json({ login: false, message: "incorrect username or password" });
    }
  } catch (error) {
    console.log(error);
  }
}

// login with google 

export async function googleAuth (req , res) {
console.log("auth controller");
  try {
   
    if (req.body.access_token) {
      // fetching user details  from google
      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${req.body.access_token}`).then( async (response)=> {
        // checking user exist or not
        console.log("axios.get success");
        const user = await User.findOne({ googleId : response.data.id , loginWithGoogle: true } , {password : 0 }).catch((err)=> {
          res.status(500).json({created : false , message : "internal server error "})

        });

        if(user) {
// check the user is banned or not 
          if(user.status) {
            
            const token = createToken(user._id);
            res.status(200).json({created:true , user , token , message:"Login Success " })
          }else {
            res.status(200).json({ user ,  message : "Sorry you are banned..!"})
          }
        

        }else {
          // if user not exist creating new account 

          const newUser = await User.create({
            googleId : response.data.id,
            firstName: response.data.given_name,
            lastName : response.data.family_name,
            email:response.data.email,
            loginWithGoogle:true ,
            picture : response.data.picture ,
            password : response.data.id,

          })

          // create token after creating 
          const token = createToken(newUser._id)
          res.status(200).json({created:true , user: newUser , token , message : "Signup Success"})
        }

      })
    }else{
      res.status(401).json({massage:"Not authorized"})
    }
  } catch (error) {
    console.log(error);
  }

}

//  user Authenticate

// function to check user is loged in or not 
export async function userAuth (req, res){
  // accessing the token
  const authHeader = req.headers.authorization;
  console.log("userAuth conerfslkdfjkjfk" , authHeader);
  if(authHeader) {
    const token = authHeader.split(' ')[1];
    // verifying user token
    jwt.verify(token , secret_key , async (err , decoded) => {
      if(err) {
        res.json({
          status:false , message : "Unauthorized "
        })
      }else {
        // fetch user details 
        const user = await User.findOne({ _id : decoded.id ,status:true });
      
        if(user){
        console.log("user verified");

          res.status(200).json({status : true , user , message: "Authorized"})
        }else{
          res.json({status : false , message : "User not exists"})
        }
      }
    })


  } else {
    res.json({ status : false , message :"No token"})
  }

}