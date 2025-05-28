import { prisma } from "../lib/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { subDays, formatISO } from "date-fns";

const getAllSubmission = asyncHandler(async (req, res) => {
    const userId = req.user?.id;

    const submissions = await prisma.submission.findMany({
        where: {
            userId,
        },
        include: {
            problem: {
                select: {
                    title: true,
                    description: true,
                },
            },
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

    const submissions = await prisma.submission.findMany({
        where: {
            userId,
            problemId,
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            user: {
                select: {
                    username: true,
                },
            },
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

const getSubmissionHeatmap = async (req, res) => {
    const userId = req.user?.id;

    try {
        const fromDate = subDays(new Date(), 364);

        const submissions = await prisma.submission.findMany({
            where: {
                userId,
                createdAt: {
                    gte: fromDate,
                },
            },
            select: {
                createdAt: true,
            },
        });

        const submissionMap = {};

        submissions.forEach((s) => {
            const dateStr = formatISO(s.createdAt, { representation: "date" });
            submissionMap[dateStr] = (submissionMap[dateStr] || 0) + 1;
        });

        const heatmapData = Object.entries(submissionMap).map(
            ([date, count]) => ({
                date,
                count,
            }),
        );

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { heatmapData: heatmapData },
                    "HeatmapData fetched successfully",
                ),
            );
    } catch (err) {
        console.error("Error fetching heatmap:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

export {
    getAllSubmission,
    getSubmissionForProblem,
    getAllSubmissionsForProblem,
    getSubmissionHeatmap,
};
