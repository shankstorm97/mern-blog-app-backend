import { RequestHandler } from "express";
import PostModel from "../models/post";

export const getPosts: RequestHandler = async (req, res, next) => {
  try {
    const posts = await PostModel.find().exec();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const createPost: RequestHandler = async (req, res, next) => {
  const mainTitle = req.body.mainTitle;
  const description = req.body.description;
  const intro = req.body.intro;
  const writtenBy = req.body.writtenBy;

  try {
    const newNote = await PostModel.create({
      mainTitle: mainTitle,
      description: description,
      intro: intro,
      writtenBy: writtenBy,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};
