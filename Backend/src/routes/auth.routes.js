import { Router } from "express";
import {
    changeCurrentPassword,
    forgotPasswordRequest,
    getCurrentUser,
    loginUser,
    logOutUser,
    refreshAccessToken,
    registerUser,
    resetForgottenPassword,
    updateAccountDetails,
    verifyEmail,
} from "../controllers/auth.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
    userRegisterSchema,
    userLoginSchema,
    userForgotPasswordRequestSchema,
    userResetForgottenPasswordSchema,
    userChangeCurrentPasswordSchema,
    userUpdateAccountDetailsSchema,
} from "../validators/auth.validators.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

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
router.route("/refresh-token").post(refreshAccessToken);
router
    .route("/forgot-password")
    .post(validate(userForgotPasswordRequestSchema), forgotPasswordRequest);
router
    .route("/reset-password/:resetToken")
    .post(validate(userResetForgottenPasswordSchema), resetForgottenPassword);

/** @description protected routes */
router.route("/logout").post(isLoggedIn, logOutUser);
router.route("/me").get(isLoggedIn, getCurrentUser);
router
    .route("/change-password")
    .post(
        isLoggedIn,
        validate(userChangeCurrentPasswordSchema),
        changeCurrentPassword,
    );
router
    .route("/update-account")
    .post(
        validate(isLoggedIn, validate(userUpdateAccountDetailsSchema)),
        updateAccountDetails,
    );

export default router;
