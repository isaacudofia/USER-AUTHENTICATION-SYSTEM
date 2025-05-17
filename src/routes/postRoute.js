import express from "express";
import {
  getAllPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/posts", getAllPosts);
router.get("/post/:id", getPost);
router.post("/post", authMiddleware, addPost);
router.put("/post/:id", authMiddleware, updatePost);
router.delete("/post/:id", authMiddleware, deletePost);

export default router;
