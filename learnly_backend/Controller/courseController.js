import Course from '../models/courseModel';


export async function addCourse (req , res) {
  try {
    console.log("body" , req.body);
    const {name , about , price ,duration , chapterName , language , category , description   } = req.body ;
    const course = new Course({
      name ,
     category,
      price ,
      tutor : res.tutorId,
      duration ,
      chapterName ,
      language ,
      description,
      course: req.body.course,
      tutorRevanue :((20/ 100) * Number(price)),
      adminRevanue :((80/100) * Number(price))
    })

    return await course.save()
    .then(() => {
      res.status(200).json({status : true , message : " Course has been added Successfully "})
    })
    .catch((error) => {
      res.status(500).json({status : false , message : "Internal Server Error"})
    })


  } catch (error) {
    console.log( error );
    res.status(500).json({status : false , message : "Internal Server Error"})
  }
}