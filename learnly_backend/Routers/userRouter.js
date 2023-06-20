import express from "express";

import { doSignup, generateOtp, googleAuth, login, userAuth } from "../Controller/authController.js";
import validate from "../middleware/validateBody.js";
import { loginSchema } from "../utils/yupSchema.js";
const router = express.Router()



router.post("/signup" , generateOtp   )

router.post("/otp" , doSignup)

router.post("/login" , validate(loginSchema), login) 

// login with google

router.post("/auth/login/google" , googleAuth)

router.get("/user-authenticate" , userAuth )

export default router