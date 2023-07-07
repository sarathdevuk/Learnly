import express from "express";
import { AdminLogin, addTutor, authAdmin, blockTutor, blockUser, changeCourseStatus, getAdminDashboard, getAllTutors, getAllUsers, unBlockTutor, unBlockUser } from "../Controller/adminController.js";
import {verifyAdmin} from '../middleware/AuthAdmin.js'
import validate from "../middleware/validateBody.js";
import { loginSchema } from "../utils/yupSchema.js";
import { validateId } from "../middleware/validateParams.js";
import { getAllCourse } from "../Controller/courseController.js";
import paginatedResults from "../middleware/paginatedResults.js";

const router = express.Router();
// Admin Auth routes
router.get ("/auth"  , authAdmin ) ;
router.post("/login", validate(loginSchema) , AdminLogin); 

router.use(verifyAdmin)

// Admin Tutor Management
router.post("/add-tutor" , addTutor);
router.get ("/tutors" , paginatedResults() , getAllTutors) ;
router.get("/block-tutor/:id" , validateId ,blockTutor);
router.get("/unblock-tutor/:id" ,validateId , unBlockTutor);

// Admin User Management
router.get("/users", getAllUsers);
router.get("/block-user/:id" , validateId , blockUser);
router.get("/unblock-user/:id" , validateId , unBlockUser);

// Course Management 
router.get('/course' ,paginatedResults() ,  getAllCourse)
router.put('/course/change-status/:id/:status' , validateId , changeCourseStatus) 

// get Dashboard Details 
router.get('/dashboard' , getAdminDashboard )







export default router