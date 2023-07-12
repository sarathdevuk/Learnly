import axiosInstance from "../axios/axios";

export const authTutor = () =>{
  return axiosInstance("tutorJwtToken").get('/tutor/auth')
}

export const tutorLogin = (loginData) => {
  return axiosInstance("tutorJwtToken").post('/tutor/login' ,{...loginData} )
}

export const changePassword = (data ) => {
  return axiosInstance("tutorJwtToken").put(`/tutor/change-password` ,{...data} )
}

export const addCourse = ( values , course , image   ) => {
  return axiosInstance("tutorJwtToken").post('/tutor/add-course' , {...values , course  , image  } ,{ headers: {"Content-Type" : "multipart/form-data" }  })
}

export const uploadAssignmentImage = ( assignmentImage  ) => {

  return axiosInstance("tutorJwtToken").post('/tutor/upload' , {assignmentImage } ,{ headers: {"Content-Type" : "multipart/form-data" }  })
}

export const getCourse =() => {
  return axiosInstance('tutorJwtToken').get('/tutor/course/')
}

export const deleteCourse = (courseId) => {
  return axiosInstance('tutorJwtToken').delete(`/tutor/delete-course/${courseId}`)
}

export const updateCourse = (values , course , image , courseId) => {
  return axiosInstance('tutorJwtToken').put('/tutor/update-course/' , {...values ,course , image , courseId}  , { headers: {"Content-Type" : "multipart/form-data" }  } )

}

export const getDashboardDetails =() => {
  return axiosInstance('tutorJwtToken').get('/tutor/dashboard/')
}

