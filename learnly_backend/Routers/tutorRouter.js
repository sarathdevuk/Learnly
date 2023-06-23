import express from "express";
import {  changePassword, tutorAuth, tutorLogin } from "../Controller/tutorController.js";
import { verifyTutorLogin } from "../middleware/AuthTutor.js";
import { EditCourseDetails, addCourse, deleteCourse, getCourse } from "../Controller/courseController.js";
import  uploadImage  from "../middleware/image-upload.js";
import validate from "../middleware/validateBody.js";
import { loginSchema } from "../utils/yupSchema.js";



const router = express.Router()

// Auth
router.get("/auth" , tutorAuth);
router.post("/login" , validate(loginSchema)  , tutorLogin);

// Verifyning the Authorization ;
router.use(verifyTutorLogin)

// Change Password
router.put('/change-password' , changePassword);

// Course Management
router.post('/add-course' , uploadImage('./public/images/course/thumbnail') , addCourse  )
router.get('/course' ,getCourse)
router.delete('/delete-course/:courseId' , deleteCourse) ;
router.put('/update-course' ,  uploadImage('./public/images/course/thumbnail') ,EditCourseDetails)

export default router