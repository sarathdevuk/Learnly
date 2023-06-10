import express from "express";
import { tutorAuth, tutorLogin } from "../Controller/tutorController.js";

const router = express.Router()


router.get("/auth" , tutorAuth);

router.post("/login" , tutorLogin);

export default router