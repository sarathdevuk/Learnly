import User from "../models/userModel.js";

export async function getUserDetails(req, res) {
  try {
    const userDetails = await User.findById(
      { _id: req.userId },
      { password: 0 }
    );
    res.status(200).json({ userDetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Internal server Error" });
  }
}
export async function updateUserProfile(req, res) {
  try {
    const { firstName, lastName } = req.body;
    const updatedUser = await User.updateOne(
      { _id: req.userId },
      { $set: { firstName, lastName } }
    );
     
    res
      .status(200)
      .json({ status: true, message: "Profile updated Successfully" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server Error" });
  }
}

export async function updateUserAvatar (req , res) {
  try {
    // updating the image upload path 
    const image = process.env.BASE_URL + req.files.image[0].path.substring('public'.length);

    // updating the data 
    const updateUser = await  User.updateOne({_id: req.userId}, {
      $set: { picture : image}
    })
    res.status(200).json({status : true, message : "Profile updated successfully"})

  } catch (error) {
    console.log(error);
    res.status(500).json({status : false, message : "Internal Server Error"})
  }

}