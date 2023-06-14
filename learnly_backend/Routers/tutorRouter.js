import express from "express";
import { addCours, changePassword, tutorAuth, tutorLogin } from "../Controller/tutorController.js";
import { verifyTutorLogin } from "../middleware/AuthTutor.js";
const router = express.Router()


router.get("/auth" , tutorAuth);

router.post("/login" , tutorLogin);

router.put('/change-password', verifyTutorLogin  , changePassword);

router.post('/add-course' , verifyTutorLogin , addCours   )

export default router