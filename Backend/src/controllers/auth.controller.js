import { prisma } from "../lib/db.js";
import { asyncHandler } from "../utility/asyncHandler.js";
import { ApiResponse } from "../utility/api-response.js";
import { ApiError } from "../utility/api-error.js";
import { UserRole } from "../generated/prisma/index.js";

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const existingUser = await prisma.user.findFirst({
        where: {
            or: [{ username }, { email }],
        },
    });

    if (existingUser) {
        throw new ApiError(400, "User with email or username already exist");
    }

    const user = await prisma.user.create({
        data: {
            username,
            email,
            password,
            role: role ?? UserRole.USER,
        },
    });
});

const verifyEmail = asyncHandler(async (req, res) => {});
const loginUser = asyncHandler(async (req, res) => {});
const resendVerificationEmail = asyncHandler(async (req, res) => {});
const logOutUser = asyncHandler(async (req, res) => {});
const getCurrentUser = asyncHandler(async (req, res) => {});
const refreshAccessToken = asyncHandler(async (req, res) => {});
const resetForgottenPassword = asyncHandler(async (req, res) => {});
const changeCurrentPassword = asyncHandler(async (req, res) => {});
const updateAccountDetails = asyncHandler(async (req, res) => {});

export {
    registerUser,
    verifyEmail,
    loginUser,
    resendVerificationEmail,
    logOutUser,
    getCurrentUser,
    refreshAccessToken,
    resetForgottenPassword,
    changeCurrentPassword,
    updateAccountDetails,
};
