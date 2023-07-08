import mongoose from 'mongoose' 

const courseSchema = new mongoose.Schema({
  name : {
    type: String,
    required : true
  },
  about : {
    type : String ,
    
  },
  tutor :  {
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'Tutor' ,
    required : true
  },
  category : {
    type : String ,
    required : true
  },
  duration : {
    type : String ,
    required : true
  },
  
  isFree: {
      type: Boolean , 
      default: false ,   
  },

  price  : {
    type : Number,
    // required: true
  },
  language : {
    type : String ,
    required : true
  },
  tutorRevenue : {
    type : Number,
    required : true
  },
  adminRevenue : {
    type : Number,
    required : true
  },
  description : {
    type : String ,
    required : true 
  },
  course :  [
    {
      chapter : String ,
      image : String ,
      lessons : [
            {
              chapterName : String,
              lessonName : String ,
              videoUrl : String ,

            }
      ]
    }
  ],
  image : {
    type : Object ,
    // required : true
  },
  status :{
    type : Boolean ,
    default : false ,
    required : true ,
  }

},{
  timestamps : true
})

const CourseModel = mongoose.model("Course" , courseSchema)

export default CourseModel