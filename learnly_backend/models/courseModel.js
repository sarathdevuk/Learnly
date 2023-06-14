import mongoose from 'mongoose' 

const courseSchema = new mongoose.Schema({
  name : {
    tyre: String,
    required : true
  },
  about : {
    type : String ,
    required: true
  },
  tutor :  {
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'Tutors' ,
    required : true ,
  },
  category : {
    type : String ,
    required : true
  },
  duration : {
    type : String ,
    required : true
  },
  price  : {
    type : Number,
    required: true
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
    required : true
  },
  status :{
    type : Boolean ,
    default : true ,
    required : true ,
  }

},{
  timestamps : true
})