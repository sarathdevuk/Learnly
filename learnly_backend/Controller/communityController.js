import { respose } from '../app' 
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
    req.files.image[0].path = req.files.image[0].path.replace('public/' , "")
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