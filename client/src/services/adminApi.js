import axiosInstance from "../axios/axios";

export const  authAdmin = () =>{
  return axiosInstance("adminJwtToken").get('/admin/auth' ,  )

}
export const adminLogin = (loginData) =>{
  return axiosInstance("adminJwtToken").post('/admin/login' , {...loginData} )
}

export const addTutor = (values) => {
  return axiosInstance('adminJwtToken').post('/admin/add-tutor' , {...values})
}

export const getTutors = () => {
  return axiosInstance('adminJwtToken').get('/admin/tutors')
}

export const blockTutor = (tutorId) =>{
  return axiosInstance('adminJwtToken').get(`/admin/block-tutor/${tutorId}`) 
}

export const unBlockTutor = (tutorId) =>{
  return axiosInstance('adminJwtToken').get(`/admin/unblock-tutor/${tutorId}`) 
}

export const getUsers = ()=>{
  return axiosInstance("adminJwtToken").get('/admin/users')
}

export const blockUser = (userId) => {
  return axiosInstance("adminJwtToken").get(`/admin/block-user/${userId}`)
}
export const unBlockUser = (userId) => {
  return axiosInstance("adminJwtToken").get(`/admin/unblock-user/${userId}`)
}