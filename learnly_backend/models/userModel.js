import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "username is required"],
    },

    lastName:{ 
      type: String
    },

    googleId : {
      type : String ,
      allowNull : true
    },

    loginWithGoogle : {
      type : Boolean ,
      default : false 
    },

    email: {
      type: String,
      required: [true, "Email is required"],
    },

    password: {
      type: String,
      required: [true, "password is required"],
    },

    phone: {
      type: String,
      required: [true, " phone is required "],
    },

    picture : {
      type: String,

    },

    image: {
      type : Object 
    }

  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema)

export default UserModel
