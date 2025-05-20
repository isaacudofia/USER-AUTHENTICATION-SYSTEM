import mongoose from "mongoose";
const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
