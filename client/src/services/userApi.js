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
export const viewAllCourse = (page , sort , fiterCategory , search , price ) =>{
  return axiosInstance('JwtToken').get(`/course?page=${page}&sort=${sort.sort},${sort.order}&category=${fiterCategory}&isFree=${price}&search=${search}`)
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

export const getCourseFullDetails = (courseId) =>{
  return axiosInstance('JwtToken').get(`/course/learn/${courseId}`)
}

// Add Question 
export const AskQuestion = (courseId  , question , index ) =>{
  return axiosInstance('JwtToken').patch(`/course/ask-question/${courseId}` , { question , index } )
}



// search course
export const searchCourse = (query) => { 
  return axiosInstance('JwtToken').get(`/search?q=${query}`)
}

// Checkout payment 
export const handleCheckout = ( values , courseId ) =>  {
  return axiosInstance('JwtToken').post('create-checkout-session', {...values , courseId})
}

// Delete Order api
export const deleteOrder = ( orderId ) =>  {
  return axiosInstance('JwtToken').get(`/cancel-payment/${orderId}`)
}

// Community
export const createCommunity=(data)=>{
  return axiosInstance("JwtToken").post('/create-community',{...data}, { headers: { "Content-Type": "multipart/form-data" } })
}

export const getCommunity=()=>{
  return axiosInstance("JwtToken").get('/community');
}

export const joinCommunity = (userId , communityId) => {
  return axiosInstance('JwtToken').put('/join-community' , {userId , communityId })
}

export const getJoinedCommunity = () => {
  return axiosInstance('JwtToken').get('/community/group/joinedGroups')
}



// group
export const createGroup = (data) => {
  return axiosInstance("JwtToken").post('/create-group' , {...data},{ headers: { "Content-Type": "multipart/form-data" } } )
}

//join group
export const joinGroup = (communityId, groupId) => {
  return axiosInstance("JwtToken").get(`/community/groups/join/${communityId}/${groupId}`)
}


export const getCommunityGroups = (communityId) => {
  return axiosInstance('JwtToken').get(`/community/groups/${communityId}`)
}
export const getJoinedGroups = () => {
  return axiosInstance('JwtToken').get('/community/group/joinedGroups')
}



