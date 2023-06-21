import Course from '../models/courseModel.js';


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

    // const chapters = req.body.course.map((chapter) => {
    //   const chapterName = chapter.chapter;
    //   const lessons = chapter.lesson.map((lesson) => {
    //     const chapterName = lesson.chapterName;
    //     const lessonName = lesson.lessonName;
    //     const videoUrl = lesson.videoUrl;
    
    //     return { chapterName, lessonName, videoUrl };
    //   });
    
    //   return { chapterName, lessons };
    // });

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
    res.status(200).json({ status: true, message: "Course has been added successfully" });

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
    const course = await Course.findOne({ _id : req.body.courseId , tutor : res.tutorId})
    if(req.files.image) {
      req.files.image[0].path = req.files.image[0].path.substring('public'.length);
      image = req.files.image[0] ;
    }else {
      image = course.image ;
    }
    if(course) {
      Course.updateOne({ _id : req.body.courseId , tutor : res.tutorId } , {
        $set : {
          name : req.body.name,
          about : req.body.about,
          category: req.body.category,
          duration : req.body.duration,
          language: req.body.language,
          description : req.body.description ,
          course : req.body.course ,
          image

        }
      }).then((response) => {
        res.status(200).json({ status : true , message : " Course updated Successfully" })
      })
    }
  } catch (error) {
    res.json({ status : true , message : "Internal server Error "})
  }
}

// Finding all The courses
export async function getAllCourse (req , res) {
  try {
    // finding All courses and find the tutor details also by populating
    const course = await Course.find({status: true}).populate('tutor').lean()
    if(course) {
      res.status(200).json({ status : true , course})
    }
  } catch (error) {
    res.status(500).json({ status : false , message : " Internal Server Error "}) ;
  }

}