import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import {
    getAllSubmission,
    getAllSubmissionsForProblem,
    getSubmissionForProblem,
} from "../controllers/submission.controller.js";

const router = Router();

router.route("/getAllSubmission").get(isLoggedIn, getAllSubmission);
router
    .route("/getSubmission/:problemId")
    .get(isLoggedIn, getSubmissionForProblem);
router
    .route("/getSubmissionCount/:problemId")
    .get(isLoggedIn, getAllSubmissionsForProblem);

export default router;
