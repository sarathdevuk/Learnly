import express from "express";
import { AdminLogin, authAdmin } from "../Controller/adminController.js";

const router = express.Router();

router.get ("/auth" , authAdmin ) ;

router.post("/login" , AdminLogin);  


export default router