import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

import {
    createPost,
    getPostsByProblem,
    getPostById,
    deletePost,
} from "../controllers/post.controller.js";
import { togglePostUpvote } from "../controllers/postUpvote.controller.js";

const router = Router();

router.route("/create").post(isLoggedIn, createPost);
router.route("/:problemId/posts").get(isLoggedIn, getPostsByProblem);
router.route("/:postId").get(isLoggedIn, getPostById);
router.route("/:postId/delete").delete(isLoggedIn, deletePost);
router.route("/:postId/upvote").put(isLoggedIn, togglePostUpvote);

export default router;
