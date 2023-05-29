import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "username is required"],
    },
    lastName: String,

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
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema)

export default UserModel
