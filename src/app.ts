import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import postsRouter from "./routes/Posts";
import morgan from "morgan";

const app = express();
app.use(express.json());

app.use(morgan("dev"));

app.use("/api/posts", postsRouter);

// error handler => used to throw error for all endpoints that are not valid
app.use((req, res, next) => {
  next(Error("Endpoint not found"));
});

// Setting up the error handler
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMsg = "An unknown error occured";
  if (error instanceof Error) errorMsg = error.message;
  res.status(500).json({ error: errorMsg });
});

export default app;
