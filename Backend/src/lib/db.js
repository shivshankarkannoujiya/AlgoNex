import { PrismaClient } from "../generated/prisma/index.js";
import { hashPasswordMiddleware } from "../middlewares/hashpassword.middleware.js";

const globalForPrisma = globalThis;
export const db = globalForPrisma.prisma ?? new PrismaClient();

db.$use(hashPasswordMiddleware);

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = db;
}
