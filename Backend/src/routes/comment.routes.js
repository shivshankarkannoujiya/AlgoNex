import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import {
    createComment,
    deleteComment,
} from "../controllers/comment.controller.js";

const router = Router();

router.route("/posts/:postId/comments").post(isLoggedIn, createComment);
router.route("/:commentId").post(isLoggedIn, deleteComment);

export default router;
