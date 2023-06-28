import express from "express";

import { doSignup, generateOtp, googleAuth, login, userAuth } from "../Controller/authController.js";
import validate from "../middleware/validateBody.js";
import { loginSchema, signupSchema } from "../utils/yupSchema.js";
import { getUserDetails, updateUserProfile } from "../Controller/userController.js";
import { verifyUser } from "../middleware/AuthUser.js";
const router = express.Router()



router.post("/signup" , validate(signupSchema) , generateOtp   )
router.post("/otp" , doSignup)
router.post("/login" , validate(loginSchema), login) 

// login with google

router.post("/auth/login/google" , googleAuth)
router.get("/user-authenticate" , userAuth )


// Account
router.get('/account', verifyUser ,  getUserDetails)
router.patch('/update-profile' , updateUserProfile)
export default router