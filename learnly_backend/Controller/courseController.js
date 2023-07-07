import { sendCourseNotification } from '../helpers/NewCourseAddedEmail.js';
import Course from '../models/courseModel.js';
import Order from '../models/orderModel.js';



export async function addCourse (req , res) {

  try {
    console.log("body" , req.body.course);

    const {name , price ,duration , language , category , description   } = req.body ;

    if (!name || !price || !duration || !language || !category || !description) {
      res.status(404);
      throw new Error("All fields are mandatory");
    }
    
    // req.files.image[0].path = req.files.image[0].path.replace('public/', "");
    req.files.image[0].path = req.files.image[0].path.substring('public'.length);

    const course = new Course({
      name,
      category,
      price,
      tutor: res.tutorId,
      duration,
      language,
      about: 'About Java',
      description,
      image: req.files.image[0], // Use req.files.image[0].path here
      tutorRevenue:(Number(price) * (80/100)),
      adminRevenue: (Number(price) * (20/100)),
      course: req.body.course,
    });

    await course.save();
    await Course.populate(course, { path: 'tutor' });
    
    
   const message = {
     tutorName : course?.tutor?.firstName + course?.tutor?.lastName ,
      course : name
   }

   res.status(200).json({ status: true, message: "Course has been added successfully" });
   
   await sendCourseNotification( process.env.ADMIN_EMAIL , message ) 
   
  } catch (error) {
    console.log( error );
    res.status(500).json({status : false , message : "Internal Server Error"})
  }
}

export async function getCourse (req , res) {
  try {
    // find all course based on teacher 
    const course = await Course.find({ tutor : res.tutorId });
    if(course) {
      res.status(200).json({status : true , course})
    }
  } catch (error) {
    res.status(500).json({ status : true , message : "Internal Server Error"})
  }
}

export async function deleteCourse (req , res) {
  try {
    // Find course by id and delete 
  const deletedCourse = await Course.findByIdAndDelete(req.params.courseId) ;

  if(deletedCourse) {
    res.status(200).json({status : true , message : " Course deleted successfully" })
  }else{
    res.status(500).json({ status : false , message : "Internal Server Error" })
  }
  } catch (error) {
    res.status(500).json({ status : false , message : "Internal server error" })
  }

}


// Edit Course Details
export async function EditCourseDetails (req , res) {
  try {
    console.log("Edit course body" , req.body.course);
    
    const course = await Course.findOne({ _id : req.body.courseId , tutor : res.tutorId})

    if (!course) {
      return res.status(404).json({ status: false, message: "Course not found" });
    }
   
    let image;
    if(req.files?.image) {
      req.files.image[0].path = req.files.image[0].path.substring('public'.length);
      image = req.files.image[0] ;
    }else {
      image = course.image ;
    }

    
      Course.updateOne({ _id : req.body.courseId , tutor : res.tutorId } , {
        $set : {
          name : req.body.name,
          about : req.body.about,
          category: req.body.category,
          duration : req.body.duration,
          language: req.body.language,
          description : req.body.description ,
          course : req.body.course ,
          image ,
      
        }
      }).then((response) => {
        console.log(response);
        res.status(200).json({ status : true , message : " Course updated Successfully" })
      })
    
  } catch (error) {
    console.log(error);

    res.json({ status : true , message : "Internal server Error "})
  }
}

// Finding all The courses
export async function getAllCourse (req , res) {
  try {
    console.log("Course" , req.paginatedResults.startIndex , "end ndex" , req.paginatedResults.endIndex);
    // finding All courses and find the tutor details also by populating
    const course = await Course.find().skip(req.paginatedResults.startIndex).limit(req.paginatedResults.limit).populate('tutor').lean()
      
    if(course) {
      res.status(200).json({ status : true , course , pagination : req.paginatedResults})
    }
  } catch (error) {
    res.status(500).json({ status : false , message : " Internal Server Error "}) ;
  }

}

export async function viewAllCourse (req , res) {
  try {
    // finding All courses and find the tutor details also by populating
    const course = await Course.find({status:true}).populate('tutor').lean()
      console.log(course);
    if(course) {
      res.status(200).json({ status : true , course })
    }
  } catch (error) {
    res.status(500).json({ status : false , message : " Internal Server Error "}) ;
  }

}

export async function getCourseDetails ( req , res) {
  try {
    console.log("get courseDetaisl");
    // find course course details with course id 
   const course = await  Course.findOne({_id: req.params.id} , 
                {'course.lessons._id' : 0}).populate('tutor').lean()
   if(course) {
    res.status(200).json({ status : true , courseDetails : course })
   }else {
    res.status(404).json({ status : false , message : " Course not found"})
   }

  } catch (error) {
    console.log("error" , error);
    res.status(500).json({ status : false , message : " Internal server Error "})
  }
}

// Check is Course Enrolled or Not
export async function isCourseEnrolled(req , res) {
  console.log("is isCourseEnrolled ",req.userId , req.params.id);
  try { 
    // finding the course from orderModel based on Course id and userId
    const enrolledCourse = await Order.findOne({ user : req.userId , course : req.params.id , status:true })
      if( enrolledCourse) {
        res.status(200).json({ enrolled : true ,  message : "Course already exist"}) ;
      }else{
        res.status(200).json({ enrolled : false , message : "Course not Exist"}) 
      }

  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
}


// get Enrolled Course 
 export async function getEnrolledCourse (req , res) {
  try {
    const enrolledCourse = await Order.find({ user: req.userId , status:true }).populate('tutor').populate('course')
    if(enrolledCourse) {
      res.status(200).json({  status : true ,   enrolledCourse  })
    }else{
      res.status(200).json({ status: false , message : "No Course found"}) 

    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error" });

  }

 }

export async function getCourseFullDetails (req , res) {
  try {
    const courseId = req.params.id  
    // geting course details by id 
    const course =  await Course.findOne({_id:courseId}).populate('tutor').lean()
      console.log("cousefull details" , course);
    if(course) {
      res.status(200).json({ status : true , courseDetails : course})
    }else{
      res.status(404).json({ status: false , message : "Course Not Found " })
    }
  } catch (error) {
    res.status(500).json({ status: false , message : "Internal Server Error" })
  }

}