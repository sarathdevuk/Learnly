import multer from 'multer' ;

export default function uploadImage (path) {
  const storage = multer.diskStorage({
    destination : function (req , file , cb) {
      cb(null , path ) ;
    },
    filename : function (req , file , cb) {
      cb(null , Date.now() + '_' )
    }
  })

  return multer({ storage }).fields([{ name : 'image' , maxCount : 1}])
}
