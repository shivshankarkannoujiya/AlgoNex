import { asyncHandler } from "../utility/asyncHandler.js";
import { ApiResponse } from "../utility/api-response.js";
import { ApiError } from "../utility/api-error.js";

const registerUser = asyncHandler(async (req, res) => {});
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
