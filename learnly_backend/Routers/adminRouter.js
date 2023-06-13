import express from "express";
import { AdminLogin, addTutor, authAdmin, blockTutor, blockUser, getAllTutors, getAllUsers, unBlockTutor, unBlockUser } from "../Controller/adminController.js";
import {verifyAdmin} from '../middleware/AuthAdmin.js'

const router = express.Router();
// Admin Auth routes
router.get ("/auth"  , authAdmin ) ;
router.post("/login" , AdminLogin); 

// Admin Tutor Management
router.post("/add-tutor" , verifyAdmin , addTutor);
router.get ("/tutors" , verifyAdmin , getAllTutors) ;
router.get("/block-tutor/:id" ,verifyAdmin ,blockTutor);
router.get("/unblock-tutor/:id" ,verifyAdmin , unBlockTutor);

// Admin User Management
router.get("/users" ,verifyAdmin , getAllUsers);
router.get("/block-user/:id" , verifyAdmin , blockUser);
router.get("/unblock-user/:id" ,verifyAdmin , unBlockUser);







export default router