import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/api-error.js";
import { prisma } from "../lib/db.js";
import { UserRole } from "../generated/prisma/index.js";

const isLoggedIn = asyncHandler(async (req, _, next) => {
    const token =
        req.cookies?.accessToken ||
        req.header("Authorizarion")?.replace("Bearer ", "");

    if (!token) {
        throw new ApiError(401, "Unauthorized access");
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id,
            },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
            },
        });

        if (!user) {
            throw new ApiError(401, "Invalid access token");
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error while checking isLoggedIn: ", error);
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

const isAdmin = asyncHandler(async (req, _, next) => {
    const userId = req.user?.id;
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            role: true,
        },
    });

    if (!user || user.role !== UserRole.ADMIN) {
        throw new ApiError(403, "Access denied, admin only");
    }
    next();
});

export { isLoggedIn, isAdmin };
