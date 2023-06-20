import asyncHandler from 'express-async-handler' 



const validate = ( Schema ) => asyncHandler(async(req,res,next) => {
  try {
    req.body = await Schema.validate(req.body , { stripUnknown :true });
    next();
  } catch (error) {
    console.log(error);
    // you need to make an middleware for error handler 
    res.json({status :false ,  message : error.message })
  }
})

export default validate