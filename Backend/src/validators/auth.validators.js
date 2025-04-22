import { z } from "zod";
import { UserRole } from "../generated/prisma/index.js";

const userRegisterSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    role: UserRole.optional().default(UserRole.USER),
    password: z.string().min(6),
});

export { userRegisterSchema };
