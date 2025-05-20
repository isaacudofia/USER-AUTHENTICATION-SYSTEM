import bcrypt from "bcrypt";
import User from "../model/authModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SALT_ROUNDS = 10; //Recommended number of salt rounds for bcrypt
const JWT_SECRET = process.env.JWT_SECRET;

export const signUp = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  try {
    const password = await bcrypt.hash(password, SALT_ROUNDS); //Hash the password using bcrypt
    const usernameExist = await User.findOne({ username });
    if (usernameExist)
      return res.status(404).json({ message: "Username exist in database" });
    const userCreated = await User.create({
      username,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", data: userCreated });
  } catch (error) {
    if (error.code === "P2002" && error.meta?.target.includes("username"))
      return res.status(401).json({ message: "Username already exists." });
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const signIn = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  try {
    const userFound = await User.findOne({ username });
    if (!userFound) return res.status(400).json("Invalid credentials. ");

    //Compare the provided password with the stored hashed password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordValid)
      return res.status(400).json({
        message: "Invalid credentials. ",
      });

    // Generate a JWT if credentials are valid
    const token = jwt.sign(
      { userId: userFound.id, username: userFound.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Login Successfully",
      token,
      data: userFound,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json("Internal Server Error");
  }
};
