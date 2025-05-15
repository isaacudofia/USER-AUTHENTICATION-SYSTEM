import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import postRoute from "./routes/postRoute.js";
import errorHandler from "./middlewares/errorHandler.js";
dotenv.config();

const app = express(); //Instance of express application

//GLOBAL MIDDLEWARES
app.use(cors());
app.use(express.json());

//Route MiddleWares
app.use("/api", postRoute);

//Error Handler Middleware
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server: Server spinning on port ${process.env.PORT}`)
);
