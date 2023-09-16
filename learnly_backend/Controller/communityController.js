// import { respose } from '../app' 
import User from '../models/userModel.js'
import Community from '../models/communityModel.js'

const handleError = (err) => {
  // Handling duplicate error
  if(err.code == 1100) {
    return "Community Name is already exists"
  }
}

export const createCommunity = async (req , res) => {
  try {
    req.files.image[0].path = req.files.image[0].path.substring('public'.length)
    // Creatng a community with details
    const newCommunity = new Community ({
      name : req.body.name,
      type : req.body.type ,
      about : req.body.about,
      admin : req.userId ,
      image : req.files.image[0] ,
      description: req.body.description
    }) 
    // Adding User into Community member
    newCommunity.members.push(req.userId);
    const community = await newCommunity.save()

    // updating user array 
    const user = await User.updateOne({_id:req.userId} , {
      $addToSet : {
        community : community._id
      }
    })

    if(community && user) {
      res.status(200).json({status: true , message : "Community Created Successfully"})
    }else {
      res.json({ status : false , message : " Community Not Created"})
    }

  } catch (err) {
    let error = handleError(err)
    res.json({ status : false , message : error})
  }
}

export const getAllCommunity = async ( req , res) => {
 try {
  const community = await Community.find({status : true} ,{ post :0 , groups :0 }) 

  if(community) {
    res.status(200).json({status: true , community : community})
  }else {
    res.status(404).json({ status : false , message :"Something went wrong "})
  }
 } catch (error) {
  res.status(500).json({ status: false, message: "Internal server error" });
 }
}

export const joinCommunity = async (req , res) => {
  console.log("join community");
  try {
    if(req.body.userId) {
      let community = await Community.find({ _id:req.body.communityId }) 

      if(community) {
        const join = await Community.updateOne({_id : req.body.communityId } , {
          $addToSet:{
            members : req.body.userId
          }
        })

        const user = await User.updateOne({_id : req.userId} , { 
          $addToSet : {
            community : req.body.communityId
          }
        })
        
   
        if (join && user.acknowledged) { 
          console.log("joined to the community");
          res.status(200).json({ status: true, message: "Joined successfully" })
         } else {
          res.json({ status: false, message: "Something went wrong try again" })
      }
   } else {
      res.status(404).json({ status: false, message: "Community not Exist" })
  }
} else {
  res.status(404).json({ status: false, message: "User ID is not provided" });
}
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Internal server error" });

  }
}

export const getJoinedCommunity = async(req,res) => {
  try {
    if(req.userId){
      const joinedCommunityList = await User.find({_id : req.userId} , {posts : 0 ,groups :0}).populate('community') ;
      res.status(200).json({ status : true , joinedCommunity : joinedCommunityList[0].community})

    }else {
      throw new Error("User Id not provided")
    }
  } catch (error) {
    res.json({ status: false, message: err.message });
  }
}


export const getCommunityDetails = async (req , res) => {
  try {
    let admin = false;
    const communityDetails = await Community.findById({ _id: req.params.communityId, status: true }, { posts: 0 }).populate('groups')
    if (communityDetails) {
        //checking user is admin or not
        if (req.userId.equals(communityDetails.admin)) admin = true;

        res.status(200).json({ status: true, communityDetails, admin })
    } else {
        throw new Error("Community not Exist")
    }
} catch (err) {
    res.json({ status: false, message: err.message });
}
}


export const createCommunityPost = async( req , res) => {
  try {
    // Create a Community post with User id and message
    let post = {
      user : req.userId ,
      message : req.body.message ,
    }
    if(req.files.image) { // updating the post image
      post.image = req.files.image[0] 
      req.files.image[0].path = req.files.image[0].path.substring('public'.length) 

    } 

    // checking user is the admin of community
    const community = await Community.findById({_id: req.body.communityId , admin: req.userId}) 

    if(community) {
      //adding new post to the existstin community
      const createPost  = await Community.updateOne({ _id : req.body.communityId}, {
        $push : {
          posts : post
        }
      })

      if(createPost) {
        res.status(200).json({ status : true , message : "Post Created Successfully"})
      }else {
        throw new Error("Something went wrong")
      }
    }else{
      throw new Error("Not permitted")
    }

  } catch (error) {
    console.log(error);
    res.json({ status : false , message : error.message })
  }
}

