import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

import {
    createPost,
    getPostsByProblem,
    getPostById,
    deletePost,
} from "../controllers/post.controller.js";

const router = Router();

router.route("/create").post(isLoggedIn, createPost);
router.route("/getpost-byproblem").get(isLoggedIn, getPostsByProblem);
router.route("/getpost-byId").get(isLoggedIn, getPostById);
router.route("/delete").delete(isLoggedIn, deletePost);

export default router;
