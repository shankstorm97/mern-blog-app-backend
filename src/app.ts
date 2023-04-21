import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import postsRouter from "./routes/Posts";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

import mongoose from "mongoose";
import env from "./utils/validateEnv";
const app = express();
app.use(express.json());
// app.use(cors);
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello to the mern-blog-app");
});
app.use("/api/posts", postsRouter);

// error handler => used to throw error for all endpoints that are not valid
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// Setting up the error handler
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let statusCode = 500;
  let errorMessage = "An unknown error occured";
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
    res.status(statusCode).json({ error: errorMessage });
  }
  res.status(statusCode).json({ error: errorMessage });
});

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose connected");

    app.listen(env.PORT, () => {
      console.log("port runnn");
    });
  })
  .catch(console.error);

export default app;
