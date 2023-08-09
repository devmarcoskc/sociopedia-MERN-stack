import express from "express";
import {getFeedPosts, getUserPosts, likePost, deleteUserPost} from "../controllers/posts.js"
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.patch("/:id/like", verifyToken, likePost);
router.delete("/:postId", verifyToken, deleteUserPost);

export default router;