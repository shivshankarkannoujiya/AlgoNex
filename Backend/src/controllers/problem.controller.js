import { prisma } from "../lib/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { UserRole } from "../generated/prisma/index.js";
import {
    getJudge0LanguageId,
    submitBatch,
    pollBatchResults,
} from "../lib/Judge0.lib.js";

const createProblem = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        difficulty,
        tags,
        example,
        constraints,
        testcases,
        codeSnippets,
        referenceSolution,
    } = req.body;

    if (req.user?.role !== UserRole.ADMIN) {
        throw new ApiError(403, "You are not allowed to create a problem");
    }

    try {
        for (const [language, solutionCode] of Object.entries(
            referenceSolution,
        )) {
            const languageId = getJudge0LanguageId(language);
            if (!languageId) {
                throw new ApiError(
                    400,
                    `Language ${language} is not supported`,
                );
            }

            const submissions = testcases.map(({ input, output }) => ({
                source_code: solutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output,
            }));

            const submissionResult = await submitBatch(submissions);
            const tokens = submissionResult.map((res) => res.token);

            const results = await pollBatchResults(tokens);

            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                console.log("RESULT---- ", result);

                console.log(
                    `Testcase ${i + 1} and Language ${language} --- result ${JSON.stringify(result.status.description)}`,
                );

                if (result.status.id !== 3) {
                    throw new ApiError(
                        400,
                        `Testcase ${i + 1} failed for language ${language}`,
                    );
                }
            }

            const newProblem = await prisma.problem.create({
                data: {
                    title,
                    description,
                    difficulty,
                    tags,
                    example,
                    constraints,
                    testcases,
                    codeSnippets,
                    referenceSolution,
                    userId: req.user?.id,
                },
            });

            return res
                .status(201)
                .json(
                    new ApiResponse(
                        201,
                        { problem: newProblem },
                        "Problem created successfully",
                    ),
                );
        }
    } catch (error) {
        console.log("Error while creating problem: ", error);
        throw new ApiError(500, "Something went wrong while creating problem");
    }
});

const getAllProblems = asyncHandler(async (_, res) => {
    const problems = await prisma.problem.findMany();
    if (!problems) {
        throw new ApiError(404, "No problems found !");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                problems: problems,
            },
            "Problems fetched successfully",
        ),
    );
});

const getProblemById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const problem = await prisma.problem.findUnique({
        where: {
            id: id,
        },
    });

    if (!problem) {
        throw new ApiError(404, "Problem not found !");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { problem: problem },
                "Problem fetched successfully",
            ),
        );
});

const updateProblemById = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        difficulty,
        tags,
        example,
        constraints,
        testcases,
        codeSnippets,
        referenceSolution,
    } = req.body;
    const { id } = req.params;

    if (req.user?.role !== UserRole.ADMIN) {
        throw new ApiError(403, "You are not allowed to update a problem");
    }

    const problem = await prisma.problem.findUnique({
        where: {
            id,
        },
    });

    if (!problem) {
        throw new ApiError(404, `Problem not found with id ${id}`);
    }

    try {
        for (const [language, solutionCode] of Object.entries(
            referenceSolution,
        )) {
            const languageId = getJudge0LanguageId(language);
            if (!languageId) {
                throw new ApiError(
                    400,
                    `Language ${language} is not supported`,
                );
            }

            const submissions = testcases.map(({ input, output }) => ({
                source_code: solutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output,
            }));

            const submissionResult = await submitBatch(submissions);
            const tokens = submissionResult.map((res) => res.token);

            const results = await pollBatchResults(tokens);

            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                console.log("RESULT---- ", result);

                console.log(
                    `Testcase ${i + 1} and Language ${language} --- result ${JSON.stringify(result.status.description)}`,
                );

                if (result.status.id !== 3) {
                    throw new ApiError(
                        400,
                        `Testcase ${i + 1} failed for language ${language}`,
                    );
                }
            }

            const updatedProblem = await prisma.problem.update({
                where: {
                    id: id,
                },
                data: {
                    title,
                    description,
                    difficulty,
                    tags,
                    example,
                    constraints,
                    testcases,
                    codeSnippets,
                    referenceSolution,
                    userId: req.user?.id,
                },
            });

            return res
                .status(201)
                .json(
                    new ApiResponse(
                        201,
                        { problem: updatedProblem },
                        "Problem updated successfully",
                    ),
                );
        }
    } catch (error) {
        console.log("Error while updating problem: ", error);
        throw new ApiError(500, "Something went wrong while updating problem");
    }
});

const deleteProblemById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const problem = await prisma.problem.findUnique({ where: { id } });
    if (!problem) {
        throw new ApiError(404, `Problem not found with id ${id}`);
    }

    await prisma.problem.delete({
        where: {
            id,
        },
    });

    return res
        .status(200)
        .json(new ApiResponse(200, "Problem deleted successfully"));
});

const getAllProblemSolvedByUser = asyncHandler(async (req, res) => {
    
});

export {
    createProblem,
    getAllProblems,
    getProblemById,
    updateProblemById,
    deleteProblemById,
    getAllProblemSolvedByUser,
};
