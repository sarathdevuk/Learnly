import express from "express";
import { changePassword, tutorAuth, tutorLogin } from "../Controller/tutorController.js";

const router = express.Router()


router.get("/auth" , tutorAuth);

router.post("/login" , tutorLogin);

router.put('/change-password' , changePassword);

export default router