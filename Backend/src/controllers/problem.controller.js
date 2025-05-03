import { prisma } from "../lib/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";

const createProblem = asyncHandler(async (req, res) => {});
const getAllProblems = asyncHandler(async (req, res) => {});
const getProblemById = asyncHandler(async (req, res) => {});
const updateProblemById = asyncHandler(async (req, res) => {});
const deleteProblemById = asyncHandler(async (req, res) => {});
const getAllProblemsSolvedByUser = asyncHandler(async (req, res) => {});

export {
    createProblem,
    getAllProblems,
    getProblemById,
    updateProblemById,
    deleteProblemById,
    getAllProblemsSolvedByUser,
};
