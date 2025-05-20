import mongoose from "mongoose";
const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    author: {
      type: String,
      require: true,
    },
    post: {
      type: String,
      require: true,
    },
    userID: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
