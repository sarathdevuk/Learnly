import Course from '../models/courseModel.js';


export async function addCourse (req , res) {

  try {
    console.log("body" , req.body);

    const {name , price ,duration , language , category , description   } = req.body ;

    if (!name || !price || !duration || !language || !category || !description) {
      res.status(404);
      throw new Error("All fields are mandatory");
    }
    
    req.files.image[0].path = req.files.image[0].path.replace('public/', "");

    const course = new Course({
      name,
      category,
      price,
      tutor: res.tutorId,
      duration,
      language,
      about: 'About Java',
      description,
      image: req.files.image[0].path, // Use req.files.image[0].path here
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
