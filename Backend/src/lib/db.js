import { PrismaClient } from "../generated/prisma/index.js";
import { hashPasswordMiddleware } from "../middlewares/hashpassword.middleware.js";

const globalForPrisma = globalThis;
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

prisma.$use(hashPasswordMiddleware);

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
