
import OrderModel from "../models/orderModel.js"; 
import asynchandler from 'express-async-handler'

export const CheckCourseEnrolled = asynchandler(async (req, res, next) => {
  try {
    // Checking course is Enrolled or not 
  const courseEnrolled = await OrderModel.findOne({ user : req.userId , course: req.params.id , status: true }) 
 
  if(courseEnrolled) {
    next();
  }else{
    res.status(404)
    throw new Error(" You dont Have Access ")
  }

  } catch (error) {
    res.status(500);
     throw new Error("Course Not Enrolled")
  }
   
 
})