import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: Object,
      required: true,
    },
    members: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
      required: true,
    },
    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Communitys",
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const groupModel = mongoose.model("Groups", GroupSchema);

export default groupModel;
