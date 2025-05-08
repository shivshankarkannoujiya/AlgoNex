import { prisma } from "../lib/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";

const getAllSubmission = asyncHandler(async (req, res) => {
    const userId = req.user?.id;

    const submissions = await prisma.submission.findMany({
        where: {
            userId,
        },
    });

    if (!submissions) {
        throw new ApiError(404, "Submissions not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { submissions: submissions },
                "Submissions fetched successfully",
            ),
        );
});

const getSubmissionForProblem = asyncHandler(async (req, res) => {
    const { problemId } = req.params;
    const userId = req.user?.id;

    if (!problemId || !userId) {
        throw new ApiError(400, "userId and problemId is required");
    }

    const submissions = await prisma.submission.findUnique({
        where: {
            userId,
            problemId,
        },
    });

    if (!submissions) {
        throw new ApiError(404, "Submission not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { submissions: submissions },
                "Submission fetched successfully",
            ),
        );
});

const getAllSubmissionsForProblem = asyncHandler(async (req, res) => {
    const { problemId } = req.params;
    if (!problemId) {
        throw new ApiError(400, "problemId is required");
    }

    const submissionCount = await prisma.submission.count({
        where: {
            problemId,
        },
    });

    if (submissionCount <= 0) {
        throw new ApiError(404, "No submissions found for this problem yet.");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { submissionCount: submissionCount },
                "Submission count fetched successfully",
            ),
        );
});

export {
    getAllSubmission,
    getSubmissionForProblem,
    getAllSubmissionsForProblem,
};
