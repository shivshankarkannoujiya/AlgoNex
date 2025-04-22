import { prisma } from "../lib/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { UserRole } from "../generated/prisma/index.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { sendEmail, emailVerificationMailGenContent } from "../utils/mail.js";
import { isPasswordCorrect } from "../utils/checkPassword.js";
import {
    generateAccessAndRefreshToken,
    generateTemporaryToken,
} from "../utils/tokens.js";
import { cookieOptions } from "../utils/constants.js";
import path from "path";
import crypto from "crypto";

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
            `${req.protocol}://${req.get("host")}/api/v1/users/verify/${unHashedToken}`,
        ),
    });

    const createdUser = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
        select: {
            id: true,
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

const verifyEmail = asyncHandler(async (req, res) => {
    const { emailVerificationToken } = req.params;
    if (!emailVerificationToken) {
        throw new ApiError(400, "Email verification token is missing");
    }

    const hashedToken = crypto
        .createHash("sha256")
        .update(emailVerificationToken)
        .digest("hex");

    const user = await prisma.user.findFirst({
        where: {
            emailVerificationToken: hashedToken,
            emailVerificationExpiry: {
                gt: new Date(),
            },
        },
    });

    if (!user) {
        throw new ApiError(404, "Token is invalid or expired");
    }

    await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            emailVerificationToken: null,
            emailVerificationExpiry: null,
            isEmailVerified: true,
        },
    });

    return res.status(200).json(new ApiResponse(200, "Email is verified"));
});

const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username && !email) {
        throw new ApiError(401, "username or email is required");
    }

    const user = await prisma.user.findFirst({
        where: {
            OR: [{ username }, { email }],
        },
    });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await isPasswordCorrect(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    if (!user.isEmailVerified) {
        throw new ApiError(401, "Please verify your email before logging in");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user.id,
    );

    const loggedInUser = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
        },
    });

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser },
                "User loggedIn successfully",
            ),
        );
});

const resendVerificationEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw new ApiError(400, "email is required");
    }

    const user = await prisma.user.findFirst({
        where: {
            email,
        },
    });

    if (!user) {
        throw new ApiError(404, "User  not found");
    }

    if (user.isEmailVerified) {
        throw new ApiError(409, "email is already verified");
    }

    const { unHashedToken, hashedToken, tokenExpiry } =
        await generateTemporaryToken();

    await prisma.user.update({
        where: {
            id: user.id,
        },
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
            `${req.protocol}://${req.get("host")}/api/v1/users/verify/${unHashedToken}`,
        ),
    });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Mail has been sent to your mail Id"));
});

const logOutUser = asyncHandler(async (req, res) => {
    await prisma.user.update({
        where: {
            id: req.user?.id,
        },
        data: {
            refreshToken: "",
        },
    });

    return res
        .status(204)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(204, {}, "User logged out"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id,
        },
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
        },
    });

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Current user fetched successfully"));
});
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
