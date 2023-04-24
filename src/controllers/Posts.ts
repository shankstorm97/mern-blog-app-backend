import { RequestHandler } from "express";
import PostModel from "../models/post";
import mongoose from "mongoose";
import createHttpError from "http-errors";

export const getPosts: RequestHandler = async (req, res, next) => {
  try {
    const posts = await PostModel.find().exec();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const getPost: RequestHandler = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    if (!mongoose.isValidObjectId) {
      throw createHttpError(400, "Invalid Post Id");
    }

    const post = await PostModel.findById(postId).exec();
    if (!post) {
      throw createHttpError(404, "Post not found");
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

// request body type for error checking
interface PostBody {
  mainTitle: string;
  description?: string;
  intro?: string;
  writtenBy?: string;
}

export const createPost: RequestHandler<
  unknown,
  unknown,
  PostBody,
  unknown
> = async (req, res, next) => {
  const mainTitle = req.body.mainTitle;
  const description = req.body.description;
  const intro = req.body.intro;
  const writtenBy = req.body.writtenBy;

  try {
    if (!mainTitle) {
      throw createHttpError(400, "Post must have a title");
    }
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

// update post function

interface updatePostParams {
  postId: string;
}

interface updatePostBody {
  mainTitle?: string;
  description?: string;
  intro?: string;
  writtenBy?: string;
}

export const updatePost: RequestHandler<
  updatePostParams,
  unknown,
  updatePostBody,
  unknown
> = async (req, res, next) => {
  const newMainTitle = req.body.mainTitle;
  const newDescription = req.body.description;
  const newIntro = req.body.intro;
  const newWrittenBy = req.body.writtenBy;
  const postId = req.params.postId;

  try {
    if (!mongoose.isValidObjectId) {
      throw createHttpError(400, "Invalid Post Id");
    }
    if (!newMainTitle) {
      throw createHttpError(400, "Please enter a title for updation");
    }
    if (!newDescription) {
      throw createHttpError(400, "Please enter a description for updation");
    }
    const post = await PostModel.findById(postId).exec();
    if (!post) {
      throw createHttpError(404, "post not found");
    }

    post.mainTitle = newMainTitle;
    post.description = newDescription;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

// deletePost function

export const deletePost: RequestHandler = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    if (!mongoose.isValidObjectId) {
      throw createHttpError(400, "Invalid Post Id");
    }

    await PostModel.findByIdAndRemove(postId).exec();
  } catch (error) {
    next(error);
  }
};
