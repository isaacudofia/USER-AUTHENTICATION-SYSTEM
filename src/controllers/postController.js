import { format } from "date-fns";

export const getAllPosts = async (req, res) => {
  try {
    res.status(200).json({
      message: "Get all posts successfully",
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
    res.status(200).json({
      message: `Get post with id: ${id}"`,
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
    res.status(204).json({
      message: `Added post successfully`,
      data: `${author} posted an article on the ${format(
        new Date(),
        "dd'th' MMMM, yyyy"
      )}`,
      post: post,
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
    res.status(200).json({
      message: `Updated post with id: ${id}`,
      data: `${author} updated an article with the id:${id} at ${format(
        new Date(),
        "dd'th' MMMM, yyyy"
      )}`,
      post: post,
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
    res.status(200).json({
      message: `Delete post with id: ${id}`,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!!!",
    });
  }
};
