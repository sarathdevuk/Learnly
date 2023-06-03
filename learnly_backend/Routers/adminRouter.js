import express from "express";
import { AdminLogin } from "../Controller/adminController.js";

const router = express.Router();


router.post("/login" , AdminLogin);  


export default router