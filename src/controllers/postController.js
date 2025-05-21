import Post from "../model/postModel.js";

export const getAllPosts = async (req, res) => {
  try {
    // Ensure req.user.id is available from the authentication middleware
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "Not authorized, user ID not found." });
    }
    const uniqueID = req.user.id;
    console.log("uniqueId: ", uniqueID);

    // Find posts belonging to the uniqueID and sort by creation date
    const posts = await Post.find({ userID: uniqueID }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Get all posts successfully",
      data: posts,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong while fetching posts.",
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
      message: "Something went wrong while fetching the post",
    });
  }
};

export const addPost = async (req, res) => {
  const { author, post } = await req.body;

  try {
    if (!req.user || !req.user.id)
      return res
        .status(401)
        .json({ message: "Not authorized, user ID not found." });
    const createPost = await Post.create({ author, post, userID: req.user.id });

    res.status(201).json({
      message: `Added post successfully`,
      data: createPost,
    });
  } catch (error) {
    res.status(400).json({
      message:
        "Something went wrong while adding the post.  Please check your input.",
    });
  }
};

export const updatePost = async (req, res) => {
  const { id } = await req.params;
  const { author, post } = req.body;
  try {
    const existingPost = await Post.findById(id);
    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Ensure req.user.id is available from the authentication middleware
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "Not authorized, user ID not found." });
    }

    // Check if the authenticated user is the owner of the post
    if (existingPost.userID.toString() !== req.user.id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this post." });
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { author, post },
      { new: true }
    );
    if (!updatedPost)
      return res.status(404).json({ message: "Post not found" });
    res.status(200).json({
      message: `Updated post with id: ${id}`,
      data: updatedPost,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong while updating the post.",
    });
  }
};

export const deletePost = async (req, res) => {
  const { id } = await req.params;
  try {
    const existingPost = await Post.findById(id);

    if (!existingPost)
      return res.status(404).json({ message: "Post not found" });

    // Ensure req.user.id is available from the authentication middleware
    if (!req.user || !req.user.id)
      return res
        .status(401)
        .json({ message: "Not authorized, user ID not found." });

    // Check if the authenticated user is the owner of the post
    if (existingPost.userID.toString() !== req.user.id.toString())
      return res
        .status(403)
        .json({ message: "Not authorized to delete this post." });

    const deletePost = await Post.findByIdAndDelete(id);
    res.status(200).json({
      message: `Delete post with id: ${id}`,
      data: deletePost,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong while deleting the post.",
    });
  }
};

//END OF POST CONTROLLER
