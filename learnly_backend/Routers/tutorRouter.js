import express from "express";
import { tutorAuth, tutorLogin } from "../Controller/tutorController";

const router = express.Router()


router.get("/tutor-auth" , tutorAuth);

router.post("/login" , tutorLogin)