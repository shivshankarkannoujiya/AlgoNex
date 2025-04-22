import { Router } from "express";
import { registerUser, verifyEmail } from "../controllers/auth.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import { userRegisterSchema } from "../validators/auth.validators.js";


const router = Router();

router
    .route("/signup")
    .post(
        upload.fields([{ name: "avatar", maxCount: 1 }]),
        validate(userRegisterSchema),
        registerUser,
    );

router.route("/verify/:emailVerificationToken").post(verifyEmail);

export default router;
