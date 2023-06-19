import express from "express";
import {  changePassword, tutorAuth, tutorLogin } from "../Controller/tutorController.js";
import { verifyTutorLogin } from "../middleware/AuthTutor.js";
import { addCourse, deleteCourse, getCourse } from "../Controller/courseController.js";
import  uploadImage  from "../middleware/image-upload.js";


const router = express.Router()

// Auth
router.get("/auth" , tutorAuth);
router.post("/login" , tutorLogin);

// Change Password
router.put('/change-password', verifyTutorLogin  , changePassword);

// Course Management
router.post('/add-course' , verifyTutorLogin , uploadImage('./public/images/course/thumbnail') , addCourse  )
router.get('/course' , verifyTutorLogin ,getCourse)
router.delete('/delete-course/:courseId' , verifyTutorLogin , deleteCourse) ;

export default router