
import OrderModel from "../models/orderModel.js";

export async function CheckCourseEnrolled (req , res , next ) {
  try {
    // Checking course is Enrolled or not 
  const courseEnrolled =await OrderModel.findOne({ user : req.userId , course: req.params.id , status: true }) 
 
  if(courseEnrolled) {
    next();
  }else{
    throw new Error("Course not Enrolled ")
  }

  } catch (error) {
    res.status(500);
         throw new Error("courseEnrolled Error")
  }
   

}