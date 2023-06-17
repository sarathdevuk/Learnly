import multer from 'multer' ;


const fileFilter = ( req , file , cb ) => {
  if(file.mimetype == 'image/jpeg' ||
     file.mimetype == 'image/png'     ) {
    cb(null , true )
  }else{
    const err = new multer.MulterError();
    err.code = 'LIMIT_FIELD_TYPE' ;
    err.message = 'Only jpeg , jpg, png , avif , and gif image allow';
    return cb(err , false)
  }
}

export default function uploadImage (path) {
  const storage = multer.diskStorage({
    destination : function (req , file , cb) {
      cb(null , path ) ;
    },
    filename : function (req , file , cb) {
      cb(null , Date.now() + '-' + file.originalname)
    }
  })
 
  return multer({ storage , fileFilter  }).fields([{ name : 'image' , maxCount : 1}])
}
     