import express from "express";
import * as PostController from "../controllers/Posts";

const router = express.Router();

router.get("/", PostController.getPosts);
router.post("/", PostController.createPost);
router.get("/:postId", PostController.getPost);

export default router;
