import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { executeCode } from "../controllers/codeExecution.controller.js";

const router = Router();

router.route("/").post(isLoggedIn, executeCode);

export default router;
