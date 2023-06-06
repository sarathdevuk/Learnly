import axiosInstance from "../axios/axios";

export const  authAdmin = () =>{
  return axiosInstance("adminJwtToken").get('/admin/auth' ,  )

}
export const adminLogin = (loginData) =>{
  return axiosInstance("adminJwtToken").post('/admin/login' , {...loginData} )
}