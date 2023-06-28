import axiosInstance from "../axios/axios";

// user Authentication in useEffect 
export const authUser = () =>{
  return axiosInstance('JwtToken').get('/user-authenticate')
}
// signup
export const userSignup = (values) =>{
  return axiosInstance('JwtToken').post('/signup' , {...values} )
}

export const verifyOtp = (values) => {
  return axiosInstance('JwtToken').post('/otp' , {otp: values.otp.join("")})
}


export const userLogin = (values) =>{
  return axiosInstance("JwtToken").post('/login' , {...values})
}

export const loginWithGoogle = (data) => {
  return axiosInstance("JwtToken").post('/auth/login/google',{...data} )
}

// Account 

export const getUserDetails = () => {
  return axiosInstance("JwtToken").get('/user/account' )
}
