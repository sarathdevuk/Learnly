import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Groups",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      required: true,
    },
    text:{
      type:String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const messageModel = mongoose.model("Messages", MessageSchema);

export default messageModel;
