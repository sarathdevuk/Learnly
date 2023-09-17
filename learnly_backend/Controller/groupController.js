// import {response} from '../app'
import Community from '../models/communityModel.js'
import Group from '../models/groupModel.js' 
import User from '../models/userModel.js'


const handleError = (err) => {
  if(err.code === 1100) {
    return "Group Name is already exists"
  }
}

export const createGroup = async( req , res) => {
  req.files.image[0].path =  req.files.image[0].path.substring('public'.length) ;
  try {
    let newGroup = new Group({
      name : req.body.name ,
      image : req.files.image[0],
      description : req.body.description ,
      members : [ req.userId] ,
      admin : req.userId 
    })

    let group = await newGroup.save() 

    if(group) {
      let user = await User.updateOne({_id : req.userId},{
        $addToSet:{
          group:group._id
        }
      })

      if(user){
        Community.updateOne({_id: req.body.communityId} , {
          $addToSet:{
            groups:group._id
          }
         }).then((response)=>{
          res.status(200).json({ status : true , message: "Group created Successfully"})
         })
      }
    }
  } catch (err) {
    let error = handleError(err)
    res.status(404).json({ status: false, message: error });    
  }

}

export const getCommunityGroups = async(req , res)=>{
  try {
    if(req.params.communityId){
      const community = await Community.findOne({ _id:req.params.communityId , status : true} , { group : 1}).populate('groups')
      if(community) {
        res.status(200).json({ status : true , community})
      }else {
        throw new Error("Community not exist")
      }
    }else {
      throw new Error("Community Id not provided")
    }
  } catch (err) {
    res.status(404).json({ status: false, message: err.message });
  }
}


export const joinGroup  = async(req,res) => {
  try {
    // check user joinded in the community
    const checkUserJoined = await Community.findOne({_id : req.params.communityId , members : {$in : [req.userId]}  })
    if(checkUserJoined) {
    //  Adding User to Group 
     const group = await Group.updateOne({_id : req.params.groupId} , {
      $addToSet : { members : req.userId }
    }) 

    // updating in the user collection 
   const user = await User.updateOne({ _id : req.userId }, {
      $addToSet : {
        group : group._id
      }
    })

    if(group && user) {
      res.status(200).json({ status : false , message : "Joined Successfully" })
    }else {
      throw new Error("Something went wrong")
    }
    }else {
      throw new Error("Join the Community")
    }

  } catch (error) {
    res.status(500).json({ status: false, message: err.message });
  }
}

export const getJoinedGroups = async( req , res) => {
  try {
    if(req.userId) {
      const user = await User.findOne({_id:req.userId}).populate('group');
      res.status(200).json({status : true , group:user[0].group})

    }else {
      throw new Error( "User id is not provided" )
    }
  } catch (error) {
   res.status(500).json({ status: false , message : error.message}) 
  }
}

export const getAllGroup = async(req , res) => {
  try {
    const group = await Group.find();
    if (group) {
        res.status(200).json({ status: true, group })
    }
} catch (err) {
    res.status(404).json({ status: false, message: err.message });
}
}

export const exitGroup = async(req, res) => {
   try {
    const group = await Group.updateOne({ _id : req.params.groupId}, {
      $pull: { members : req.userId}
    })
    const user = await User.updateOne({_id: req.userId} , {
      $pull : {group: req.params.groupId}
    })

    if(group && user) {
      res.status(200).json({status : true , message : "Successfully Exited from group"})
    }
   } catch (err) {
    res.status(500).json({ status: false, message: err.message });
   }
}