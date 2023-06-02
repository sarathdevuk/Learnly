import express from "express";
import { doSignup, generateOtp, googleAuth, login } from "../Controller/authController.js";
const router = express.Router()



router.post("/signup" , generateOtp   )

router.post("/otp" , doSignup)

router.post("/login" , login) 

// login with google

router.post("/auth/login/google" , googleAuth)

export default router