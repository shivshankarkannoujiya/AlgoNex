import { Router } from "express";
import {
    loginUser,
    registerUser,
    verifyEmail,
} from "../controllers/auth.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
    userRegisterSchema,
    userLoginSchema,
} from "../validators/auth.validators.js";

const router = Router();

/** @description unprotected routes */
router
    .route("/signup")
    .post(
        upload.fields([{ name: "avatar", maxCount: 1 }]),
        validate(userRegisterSchema),
        registerUser,
    );

router.route("/verify/:emailVerificationToken").post(verifyEmail);
router.route("/login").post(validate(userLoginSchema), loginUser);

/** @description protected routes */

export default router;
