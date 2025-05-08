import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import {
    executeCode,
    runCode,
} from "../controllers/codeExecution.controller.js";

const router = Router();

router.route("/execute").post(isLoggedIn, executeCode);
router.route("/run").post(isLoggedIn, runCode);

export default router;
