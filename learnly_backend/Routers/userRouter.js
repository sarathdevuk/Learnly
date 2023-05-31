import express from "express";
import { doSignup, generateOtp, login } from "../Controller/authController.js";
const router = express.Router()



router.post("/signup" , generateOtp   )

router.post("/otp" , doSignup)

router.post("/login" , login) 

export default router