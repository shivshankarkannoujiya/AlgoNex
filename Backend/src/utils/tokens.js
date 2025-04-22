import jwt from "jsonwebtoken";
import { prisma } from "../lib/db.js";
import { ApiError } from "./api-error.js";
import crypto from "crypto";

function generateAccessToken(user) {
    return jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
    );
}

function generateRefreshToken(user) {
    return jwt.sign(
        {
            id: user.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
    );
}

async function generateAccessAndRefreshToken(userId) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) throw new ApiError(404, "User not found");

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        await prisma.user.update({
            where: {
                id: userId,
            },
            data: { refreshToken },
        });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error generating tokens: ", error);
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
}

async function generateTemporaryToken() {
    const unHashedToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = await crypto
        .createHash("sha256")
        .update(unHashedToken)
        .digest("hex");

    const tokenExpiry = new Date(Date.now() + 20 * 60 * 1000);
    return { unHashedToken, hashedToken, tokenExpiry };
}

export { generateAccessAndRefreshToken, generateTemporaryToken };
