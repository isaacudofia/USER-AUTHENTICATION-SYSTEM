import Post from "../model/postModel.js";

export const getAllPosts = async (req, res) => {
  try {
    const uniqueID = req.user.id;
    console.log("uniqueId: ", uniqueId);
    const posts = await Post.find({ userID: uniqueID }).sort({ createdAt: -1 });
    res.status(200).json({
      message: "Get all posts successfully",
      data: posts,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!!!",
    });
  }
};

export const getPost = async (req, res) => {
  const { id } = await req.params;
  try {
    const findPost = await Post.findById(id);
    if (!findPost) return res.status(404).json({ message: "No Post found..." });
    res.status(200).json({
      message: `Get post with id: ${id}`,
      data: findPost,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!!!",
    });
  }
};

export const addPost = async (req, res) => {
  const { author, post } = await req.body;

  try {
    const createPost = await Post.create({ author, post });
    await createPost.save();
    res.status(201).json({
      message: `Added post successfully`,
      data: createPost,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!!!",
    });
  }
};

export const updatePost = async (req, res) => {
  const { id } = await req.params;
  const { author, post } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, { author, post });
    if (!updatedPost)
      return res.status(404).json({ message: "Post not found" });
    res.status(200).json({
      message: `Updated post with id: ${id}`,
      data: updatedPost,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!!!",
    });
  }
};

export const deletePost = async (req, res) => {
  const { id } = await req.params;
  try {
    const deletePost = await Post.findByIdAndDelete(id);
    res.status(200).json({
      message: `Delete post with id: ${id}`,
      data: deletePost,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!!!",
    });
  }
};
