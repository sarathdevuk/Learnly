import express from "express";
import {  changePassword, tutorAuth, tutorLogin } from "../Controller/tutorController.js";
import { verifyTutorLogin } from "../middleware/AuthTutor.js";
import { addCourse } from "../Controller/courseController.js";
import { uploadImage } from "../middleware/image-upload.js";


const router = express.Router()

router.get("/auth" , tutorAuth);

router.post("/login" , tutorLogin);

router.put('/change-password', verifyTutorLogin  , changePassword);

router.post('/add-course' , verifyTutorLogin , uploadImage('./public/images/course/thumbnail') , addCourse  )

export default router