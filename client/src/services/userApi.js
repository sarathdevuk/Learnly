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
  return axiosInstance("JwtToken").get('/account' )
}

export const updateUserProfile = (values) => {
  return axiosInstance("JwtToken").patch('/update-profile' ,{ ...values} )
}
export const updateUserAvatar = (image) => {
  return axiosInstance("JwtToken").patch('/update-avatar', { ...image }, { headers: { "Content-Type": "multipart/form-data" } })
}

// Course 
export const viewAllCourse = () =>{
  return axiosInstance('JwtToken').get('/course')
}

// get Course details 
export const getCourseDetails = (courseId) =>{
  return axiosInstance('JwtToken').get(`/course/${courseId}`)
}

//check whether user alread enrolled the couser
export const isCourseEnrolled = (courseId) =>{
  return axiosInstance('JwtToken').get(`/is-course-enrolled/${courseId}`)
}

// get Enrolled Course
export const getEnrolledCourse = () =>{
  return axiosInstance('JwtToken').get('/enrolled-course')
}


// Checkout payment 
export const handleCheckout = ( values , courseId ) =>  {
  return axiosInstance('JwtToken').post('create-checkout-session', {...values , courseId})
}

// Delete Order api
export const deleteOrder = ( orderId ) =>  {
  console.log("DElete order api @#$#@!$#@$@#$23");
  return axiosInstance('JwtToken').get(`/cancel-payment/${orderId}`)
}
