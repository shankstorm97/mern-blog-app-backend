import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import postsRouter from "./routes/Posts";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

const app = express();
app.use(express.json());

app.use(morgan("dev"));

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

export default app;
