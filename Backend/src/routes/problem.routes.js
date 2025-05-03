import { Router } from "express";
import { isLoggedIn, isAdmin } from "../middlewares/auth.middleware.js";
import {
    createProblem,
    deleteProblemById,
    getAllProblems,
    getAllProblemsSolvedByUser,
    getProblemById,
    updateProblemById,
} from "../controllers/problem.controller.js";

const router = Router();

router.route("/create-problem").post(isLoggedIn, isAdmin, createProblem);
router.route("/get-all-problems").get(isLoggedIn, getAllProblems);
router.route("/get-problem/:id").get(isLoggedIn, getProblemById);
router.route("/update-problem:/id").put(isLoggedIn, isAdmin, updateProblemById);
router
    .route("/delete-problem/:id")
    .delete(isLoggedIn, isAdmin, deleteProblemById);
router.route("/get-solved-problem").get(isLoggedIn, getAllProblemsSolvedByUser);

export default router;
