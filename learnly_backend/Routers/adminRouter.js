import express from "express";
import { AdminLogin, addTutor, authAdmin, blockTutor, getAllTeachers, getAllTutors, unBlockTutor } from "../Controller/adminController.js";

const router = express.Router();
// Admin Auth routes
router.get ("/auth" , authAdmin ) ;
router.post("/login" , AdminLogin); 

// Admin Tutor Management
router.post("/add-tutor" , addTutor);
router.get ("/tutor" , getAllTutors) ;
router.get("/block-tutor/:id" , blockTutor);
router.get("/unblock-tutor/:id" , unBlockTutor);






export default router