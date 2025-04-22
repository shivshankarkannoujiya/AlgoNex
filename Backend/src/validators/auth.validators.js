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

const resendVerificationEmailSchema = z.object({
    email: z.string().email(),
});

export { userRegisterSchema, userLoginSchema, resendVerificationEmailSchema };
