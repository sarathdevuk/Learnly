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

export const addCourse = ( values , course , image ) => {
  const headers = {Authorization :`Bearer ${localStorage.getItem('tutorJwtToken')}`}
  return axiosInstance("tutorJwtToken").post('/tutor/add-course' , {...values , course ,image } ,{ headers: {"Content-Type" : "multipart/form-data" }  })
}

export const getCourse =() => {
  return axiosInstance('tutorJwtToken').get('/tutor/course/')
}