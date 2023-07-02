import express from "express";

import { doSignup, generateOtp, googleAuth, login, userAuth } from "../Controller/authController.js";
import validate from "../middleware/validateBody.js";
import { loginSchema, signupSchema } from "../utils/yupSchema.js";
import { getUserDetails, updateUserAvatar, updateUserProfile } from "../Controller/userController.js";
import { verifyUser } from "../middleware/AuthUser.js";
import uploadImage from "../middleware/image-upload.js";
import { getCourseDetails, isCourseEnrolled, viewAllCourse } from "../Controller/courseController.js";
import { cancelOrder, doPayment, verifyPayment,  } from "../Controller/orderController.js";
const router = express.Router()



router.post("/signup" , validate(signupSchema) , generateOtp   )
router.post("/otp" , doSignup)
router.post("/login" , validate(loginSchema), login) 

// login with google

router.post("/auth/login/google" , googleAuth)
router.get("/user-authenticate" , userAuth )


// Account
router.get('/account', verifyUser ,  getUserDetails)
router.patch('/update-profile' ,verifyUser , updateUserProfile)
router.patch('/update-avatar' ,verifyUser , uploadImage("./public/images/user") , updateUserAvatar)

// Course
router.get('/course' , viewAllCourse)
router.get('/course/:id' , getCourseDetails)
router.get('is-course-enrolled/:id' ,verifyUser , isCourseEnrolled )

// payment 
router.post('/create-checkout-session', verifyUser , doPayment)
router.get('/verifyPayment/:orderId', verifyPayment)
router.get('/cancel-payment/:orderId', cancelOrder)


export default router