import express from "express";
import { signIn, signUp } from "../controllers/authController.js";

//Router instance from express
const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);

export default router;
