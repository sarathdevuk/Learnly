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
      // required: [true, " phone is required "],
    },

    picture : {
      type: String,

    },

    image: {
      type : Object 
    },
    status : {
      type : Boolean ,
      default : true,
    },
    community:{
      type : [ mongoose.Schema.Types.ObjectId],
      ref: 'Communitys'
    },
    group : {
      type : [mongoose.Schema.Types.ObjectId] ,
      ref : "Groups"
    }


  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema)

export default UserModel
