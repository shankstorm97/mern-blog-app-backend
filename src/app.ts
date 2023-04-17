import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import PostModel from "./models/post";

const app = express();

app.get("/", async (req, res) => {
  try {
    const posts = await PostModel.find().exec();
    res.status(200).json(posts);
  } catch (error) {}
});

// Setting up the error handler

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMsg = "An unknown error occured";
  if (error instanceof Error) errorMsg = error.message;
  res.status(500).json({ error: errorMsg });
});

export default app;
