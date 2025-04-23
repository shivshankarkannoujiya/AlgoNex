import { z } from "zod";
import { UserRole } from "../generated/prisma/index.js";

const userRegisterSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    role: z.string().optional().default(UserRole.USER),
    password: z.string().min(6),
});

const userLoginSchema = z.object({
    username: z.string().min(3).optional(),
    email: z.string().email().optional(),
    password: z.string(),
});

const userResendVerificationEmailSchema = z.object({
    email: z.string().email(),
});
const userForgotPasswordRequestSchema = z.object({
    email: z.string().email(),
});

const userResetForgottenPasswordSchema = z.object({
    params: z.object({
        resetToken: z.string().min(1, "Reset token is required"),
    }),

    body: z.object({
        newPassword: z.string().min(6),
    }),
});

const userChangeCurrentPasswordSchema = z.object({
    oldPassword: z.string().min(6),
    newPassword: z.string().min(6),
});

const userUpdateAccountDetailsSchema = z.object({
    username: z.string().min(3).optional(),
});

export {
    userRegisterSchema,
    userLoginSchema,
    userResendVerificationEmailSchema,
    userForgotPasswordRequestSchema,
    userResetForgottenPasswordSchema,
    userChangeCurrentPasswordSchema,
    userUpdateAccountDetailsSchema,
};
