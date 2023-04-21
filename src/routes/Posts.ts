import express from "express";
import * as PostController from "../controllers/Posts";

const router = express.Router();

router.get("/", PostController.getPosts);
router.post("/", PostController.createPost);
router.get("/:postId", PostController.getPost);
router.patch("/:postId", PostController.updatePost);
router.delete("/:postId", PostController.deletePost);

export default router;
