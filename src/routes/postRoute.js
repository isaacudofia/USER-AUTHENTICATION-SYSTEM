import express from "express";
const router = express.Router();
import {
  getAllPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

router.get("/posts", getAllPosts);
router.get("/post/:id", getPost);
router.post("/post", addPost);
router.put("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

export default router;
