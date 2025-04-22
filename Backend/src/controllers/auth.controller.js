import { prisma } from "../lib/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { UserRole } from "../generated/prisma/index.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { generateTemporaryToken } from "../utils/tokens.js";
import { sendEmail, emailVerificationMailGenContent } from "../utils/mail.js";
import path from "path";

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, role, password } = req.body;
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [{ username }, { email }],
        },
    });

    if (existingUser) {
        throw new ApiError(400, "User with email or username already exist");
    }

    const avatarLocalPath = path.resolve(req.files?.avatar[0]?.path);
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    const user = await prisma.user.create({
        data: {
            username,
            email,
            avatarUrl: avatar.secure_url,
            avatarLocalPath,
            password,
            role: role ?? UserRole.USER,
        },
    });

    const { unHashedToken, hashedToken, tokenExpiry } =
        await generateTemporaryToken();

    await prisma.user.update({
        where: { id: user.id },
        data: {
            emailVerificationToken: hashedToken,
            emailVerificationExpiry: tokenExpiry,
        },
    });

    await sendEmail({
        email: user?.email,
        subject: "Please verify your email",
        mailGenContent: emailVerificationMailGenContent(
            user.username,
            `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`,
        ),
    });

    const createdUser = await prisma.user.findUnique({
        where: {
            email,
        },
        select: {
            username: true,
            email: true,
            role: true,
        },
    });

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user");
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                { user: createdUser },
                "Users registered successfully and verification email has been sent on your email.",
            ),
        );
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
