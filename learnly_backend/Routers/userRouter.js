import express from "express";

import { doSignup, generateOtp, googleAuth, login, userAuth } from "../Controller/authController.js";
import validate from "../middleware/validateBody.js";
import { loginSchema, signupSchema } from "../utils/yupSchema.js";
import { getUserDetails, updateUserAvatar, updateUserProfile } from "../Controller/userController.js";
import { verifyUser } from "../middleware/AuthUser.js";
import uploadImage from "../middleware/image-upload.js";
import { AskQuestion, ViewCourses, getCourseDetails, getCourseFullDetails, getEnrolledCourse, isCourseEnrolled, search, viewAllCourse } from "../Controller/courseController.js";
import { cancelOrder, doPayment, verifyPayment,  } from "../Controller/orderController.js";
import { validateId } from "../middleware/validateParams.js";
import { CheckCourseEnrolled } from "../middleware/CheckCourseEnrolled.js";
import { createCommunity, createCommunityPost, deleteCommunity, editCommunity, getAllCommunity, getCommunityDetails, getCommunityFeeds, getCommunityMembers, getJoinedCommunity, joinCommunity, leaveFromCommunity } from "../Controller/communityController.js";
import { createGroup, exitGroup, getAllGroup, getCommunityGroups, getJoinedGroups, joinGroup } from "../Controller/groupController.js";
import { createMessage, getMessages } from "../Controller/messageController.js";
const router = express.Router()



router.post("/signup" , validate(signupSchema) , generateOtp   )
router.post("/otp" , doSignup)
router.post("/login" , validate(loginSchema), login) 

// login with google

router.post("/auth/login/google" , googleAuth)
router.get("/user-authenticate" , userAuth )


// Account
router.get('/account', verifyUser ,  getUserDetails)
router.patch('/update-profile' ,verifyUser , updateUserProfile)
router.patch('/update-avatar' ,verifyUser , uploadImage("./public/images/user") , updateUserAvatar)

// Course
router.get('/search', search)
router.get('/course' , ViewCourses)
router.get('/course/:id' ,validateId , getCourseDetails)

// Check is User Enrolled Course
router.get('/is-course-enrolled/:id' , validateId , verifyUser , isCourseEnrolled )
router.get('/enrolled-course' , verifyUser,  getEnrolledCourse)

router.get('/course/learn/:id' ,validateId ,  verifyUser, CheckCourseEnrolled , getCourseFullDetails)

//ASk Questions
router.patch('/course/ask-question/:id', validateId ,verifyUser, CheckCourseEnrolled ,  AskQuestion )


// payment 
router.post('/create-checkout-session', verifyUser , doPayment)
router.get('/verifyPayment/:orderId', verifyPayment)
router.get('/cancel-payment/:orderId', cancelOrder)

// Community
router.post('/create-community' , verifyUser , uploadImage("./public/images/community") , createCommunity )
router.get('/community' , getAllCommunity)
router.put('/join-community', verifyUser , joinCommunity)
router.get('/joined-community', verifyUser , getJoinedCommunity)
router.get('/community-details/:communityId', verifyUser , getCommunityDetails);
router.post('/create-community/post', verifyUser, uploadImage('./public/images/post'), createCommunityPost);
router.get('/community/feeds/:communityId', verifyUser, getCommunityFeeds);
router.get('/community/members/:communityId', verifyUser, getCommunityMembers);
router.post('/edit-community', verifyUser, uploadImage("./public/images/community"), editCommunity);
router.get('/community/leave/:communityId', verifyUser, leaveFromCommunity);
router.get('/commuinty/delete/:communityId', verifyUser, deleteCommunity);
// Group
router.post('/create-group' , verifyUser , uploadImage("./public/images/group") , createGroup ) 
router.get('/community/groups/:communityId', verifyUser , getCommunityGroups ) 
router.get('/community/groups/join/:communityId/:groupId' , verifyUser , joinGroup)
router.get('/community/group/joinedGroups/', verifyUser , getJoinedGroups);
router.get('/community/groups',verifyUser , getAllGroup);
router.get('/community/groups/exit/:groupId', verifyUser,  exitGroup);

// Messages
router.post('/messages', verifyUser , createMessage )
router.get('/messages/:groupId', verifyUser , getMessages)


export default router