import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import {
    createComment,
    deleteComment,
} from "../controllers/comment.controller.js";
import { toggleCommentUpvote } from "../controllers/commentUpvote.controller.js";

const router = Router();

router.route("/posts/:postId/comments").post(isLoggedIn, createComment);
router.route("/:commentId").delete(isLoggedIn, deleteComment);

router.route("/:commentId/upvote").put(isLoggedIn, toggleCommentUpvote);
export default router;
