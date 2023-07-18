import { sendCourseNotification } from '../helpers/NewCourseAddedEmail.js';
import Course from '../models/courseModel.js';
import Order from '../models/orderModel.js';
import cloudinary from '../config/cloudinary.js';


export async function addCourse (req , res) {
         
  try {

    const {name ,duration , language , category , description ,isFree ,price } = req.body ;

    if (!name  || !duration || !language || !category || !description) {
      res.status(404);
      throw new Error("All fields are mandatory");
    }
    
    //Handling the Course Price Based on IsFree  

    const coursePrice = isFree === 'true' ? 0 : price;


      // upload each Assignment to cloudinary
      const uploadAssignmentToCloudinary = async (assignment) => {
        if (assignment) { 
          console.log("chapter" , assignment);
          const uploadedAssignment = await cloudinary.uploader.upload(assignment, {  //uploading to cloudinary
            folder: 'learnly', //setting folder to upload
            resource_type:'raw',
          });
          return uploadedAssignment || '';  
        }
        return '';
      };
      

      // Update Course For adding assignments into the cloudinary 
      const updatedCourse = await Promise.all(
        req.body.course.map(async (chapter) => {
          const assignment = await uploadAssignmentToCloudinary(chapter?.assignment);
          
          return {
            chapter: chapter.chapter,
            assignments: assignment, //updating assingment uploaded object
            lessons: chapter.lessons,
          };
        })
      );
      
          
    // req.files.image[0].path = req.files.image[0].path.replace('public/', "");
    req.files.image[0].path = req.files.image[0].path.substring('public'.length);

    const course = new Course({
      name,
      category,
      isFree,
      price : coursePrice ,
      tutor: res.tutorId,
      duration,
      language,
      about: 'About Java',
      description,
      image: req.files.image[0], // Use req.files.image[0].path here
      tutorRevenue:(Number(coursePrice) * (80/100)),
      adminRevenue: (Number(coursePrice) * (20/100)),
      course: updatedCourse
    });

    await course.save();
    await Course.populate(course, { path: 'tutor' }); 

    console.log(course);
    
    
    // creating an message object for sending email messages 
   const message = {
     tutorName : course?.tutor?.firstName + course?.tutor?.lastName ,
      course : name
   }

   res.status(200).json({ status: true, message: "Course has been added successfully" });
   
  //  sending an email notification about the course added
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
    console.log("body" , req.body.course);

    //find course based on course id && tutor id
    const course = await Course.findOne({ _id : req.body.courseId , tutor : res.tutorId})

    if (!course) {
      return res.status(404).json({ status: false, message: "Course not found" });
    }
   
    // Handling Course thumbnail image
    let image;
    if(req.files?.image) {
      req.files.image[0].path = req.files.image[0].path.substring('public'.length);
      image = req.files.image[0] ;
    }else {
      image = course.image ;
    }

  // Handling the course price if its changed 
    const coursePrice = req.body?.isFree === 'true' ? 0 : req.body?.price;


     // upload each Assignment to cloudinary
     const uploadAssignmentToCloudinary = async (assignment) => {
      
       if (assignment && !assignment.url) { 
        console.log("assignment$$",assignment   );
        const uploadedAssignment = await cloudinary.uploader.upload(assignment, {  //uploading to cloudinary
          folder: 'learnly', //setting folder to upload
          resource_type:'raw', 
        });
        return uploadedAssignment || '';  
      }
      return assignment;
    };
    

    // Update Course For adding assignments into the cloudinary 
    const updatedCourse = await Promise.all(
      req.body.course.map(async (chapter) => {
        console.log("if assignment",chapter);
        const assignment = await uploadAssignmentToCloudinary(chapter?.assignment);
        
        return {
          chapter: chapter.chapter,
          assignment: assignment, //updating assingment uploaded object
          lessons: chapter.lessons,
        };
      })
    );

    console.log("updatedCourse" ,updatedCourse);
      Course.updateOne({ _id : req.body.courseId , tutor : res.tutorId } , {
        $set : {
          name : req.body.name,
          about : req.body.about,
          category: req.body.category,
          duration : req.body.duration,
          language: req.body.language,
          description : req.body.description ,
          course : updatedCourse,
          isFree:req.body.isFree ,
          price:coursePrice ,
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


  export async function ViewCourses (req , res) {
    console.log("ViewCourses page");
      try {
        console.log(req.query.isFree );
       
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        let sort = req.query.sort || "price";
        let category = req.query.category || "All";
        let isFree = req.query.isFree || "";
        
        const categoryOptions = [
          "Programming",
          "JavaScript",
          "Python",
          "DataStructures",
        ];
        
        category === "All"
          ? (category = [...categoryOptions])
          : (category = req.query.category.split(","));
        
        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
        
        let sortBy = {};
        if (sort[1]) {
          sortBy[sort[0]] = sort[1];
        } else {
          sortBy[sort[0]] = "asc";
        }
        
        console.log(search, category, sortBy, page, limit, isFree);
        
        const query = {
          name: { $regex: search, $options: "i" },
          category: { $in: category },
        };
        
        if (isFree === "true") {
          query.isFree = true;
        } else if (isFree === "false") {
          query.isFree = false;
        }
        
        const course = await Course.find(query)
          .populate('tutor') 
          .sort(sortBy)
          .skip(page * limit)
          .limit(limit)
        
        console.log(course, "course");
        
        const total = await Course.countDocuments(query);
        
        const response = {
          total,
          page: page + 1,
          limit,
          category: categoryOptions,
          course,
        };
        
        res.status(200).json(response);
          

      } catch (error) {
        console.log(error);
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

export async function search (req , res) {
  console.log(req.query);
  try {
    const key = req.query.q.replace(/[^a-zA-Z ]/g, ""); // Sanitize the search query to remove special characters

    const course = await Course.find({
      $or: [
        { name: { $regex: key, $options: 'i' } }, // Perform a case-insensitive search on the 'name' field
        { tags: { $regex: key, $options: 'i' } } // Perform a case-insensitive search on the 'tags' field
      ]
    })


    if(course) {
       res.status(200).json({ status: true , result : course})
    }else{
      res.status(404).json({ status: false , message: "Course not Found" })
    }


  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false , message : "internal server Error"})
  }

  
}

// Add New Question
export async function AskQuestion (req ,res) {
  console.log("Asl Questionrs", req.body);
  try {
    const courseId = req.params.id;
    console.log(courseId);
    const userQuestion = req.body.question ; 

    const courseIndex = req.body.index

    // Find the course by its ID
    const course = await Course.findById(courseId);

    // Check if the course exists
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Add the user's question to the course's questionsAndAnswers array
    course.course[courseIndex].questionsAndAnswers.push({ question: userQuestion });

    // Save the updated course to the database
    await course.save();

    return res.status(200).json({status : true ,  message: 'Question saved successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }

}