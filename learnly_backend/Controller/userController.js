import User from "../models/userModel.js";

export async function getUserDetails(req, res) {
  console.log("get userDetails" , req.userId);
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
    console.log(req.userId);
    const updatedUser = await User.updateOne(
      { _id: req.userId },
      { $set: { firstName, lastName } }
    );
     
    console.log("updaye" , updatedUser);
    res
      .status(200)
      .json({ status: true, message: "Profile updated Successfully" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server Error" });
  }
}
