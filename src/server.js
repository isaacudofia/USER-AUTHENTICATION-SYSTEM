import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import postRoute from "./routes/postRoute.js";
import authRoutes from "./routes/authRoute.js";
import errorHandler from "./middlewares/errorHandler.js";
import mongoose from "mongoose";
dotenv.config();

const app = express(); //Instance of express application

//GLOBAL MIDDLEWARES
app.use(cors());
app.use(express.json());

//Route MiddleWares
app.use("/api/auth", authRoutes);
app.use("/api", postRoute);

//Error Handler Middleware
app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() =>
    app.listen(
      process.env.PORT,
      console.log(
        `Server Spinning: Server spinning on ${process.env.PORT} and connected to DB`
      )
    )
  )
  .catch((err) => console.log(err.message));
