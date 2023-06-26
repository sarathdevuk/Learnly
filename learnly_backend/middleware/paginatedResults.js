import Tutor from '../models/tutorModel'
import Course from '../models/courseModel';


const paginatedResults = () => async(req , res, next) => {


  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10 ;

  const startIndex = (page - 1 ) * limit;
  const endIndex = page *limit ;

  let model = null;

  switch ( req.query.model){
     
    case 'tutor' : 
      model = Tutor 
      break;
    
    case 'course' : 
      model = Course ;
      break ;
       
      default :
        return res.status(404).json({ status : false , message :"Not proper syntax"});  
    }

    if(!model) {
     return res.status(404).json({ status: false , message : "No Model Found"})
    }



    const modelCount = await model.countDocuments();
    const results  = {};
    
    if(endIndex < modelCount ){
      results.next= {
        page: page + 1,
        limit : limit
      }
    }

    if(startIndex > 0) {
      results.previous = {
        page: page -1,
        limit : limit ,
      }
    }

    results.limit = endIndex > modelCount ? modelCount : endIndex;
    results.current = parseInt(req.query.page);
    results.count = modelCount;
    results.endIndex = endIndex;
    results.startIndex = startIndex ;

    req.paginatedResults = results ;
    next();
}

export default paginatedResults()