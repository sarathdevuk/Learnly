import express from "express";
import { AdminLogin, addTutor, authAdmin, blockTutor, blockUser, getAllTutors, getAllUsers, unBlockTutor, unBlockUser } from "../Controller/adminController.js";

const router = express.Router();
// Admin Auth routes
router.get ("/auth" , authAdmin ) ;
router.post("/login" , AdminLogin); 

// Admin Tutor Management
router.post("/add-tutor" , addTutor);
router.get ("/tutors" , getAllTutors) ;
router.get("/block-tutor/:id" , blockTutor);
router.get("/unblock-tutor/:id" , unBlockTutor);

// Admin User Management
router.get("/users" ,  getAllUsers);
router.get("/block-user/:id" , blockUser);
router.get("/unblock-user/:id" , unBlockUser);







export default router