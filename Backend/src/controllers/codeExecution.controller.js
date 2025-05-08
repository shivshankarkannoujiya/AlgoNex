import { prisma } from "../lib/db.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
    submitBatch,
    pollBatchResults,
    getLanguageNameById,
} from "../lib/Judge0.lib.js";
import { Status } from "../generated/prisma/index.js";

const executeCode = asyncHandler(async (req, res) => {
    const { source_code, language_id, stdin, expected_outputs, problemId } =
        req.body;
    const userId = req.user?.id;

    if (
        !Array.isArray(stdin) ||
        stdin.length === 0 ||
        !Array.isArray(expected_outputs) ||
        expected_outputs.length !== stdin.length
    ) {
        throw new ApiError(400, "Invalid or Missing test cases");
    }

    /** @description Prepare each testcases for judge0 batch submission */
    const submissions = stdin.map((input) => ({
        source_code,
        language_id,
        stdin: input,
    }));

    /** @description Send the batch of submissions to judge0 */
    const submitResponse = await submitBatch(submissions);
    const tokens = submitResponse.map((res) => res.token);

    /** @description Poll judge0 for the results of all submitted testcases */
    const results = await pollBatchResults(tokens);

    console.log(`<------------- Execute Result -------------> `);
    console.log(results);

    /** @description Analyze testcase result */
    let allPassed = true;
    const detailedResult = results.map((result, index) => {
        const stdout = result.stdout?.trim() || "";
        const expected_output = expected_outputs[index]?.trim();
        const passed = stdout === expected_output;

        //TODO: logging
        console.log(`Testcase #${index + 1}`);
        console.log(`Input: ${stdin[index]}`);
        console.log(
            `Expected_output for textcase: #${index + 1} is: ${expected_output}`,
        );
        console.log(`Actual/stdout/Judge0_out: ${stdout}`);
        console.log(`isMatched: ${passed}`);

        if (!passed) allPassed = false;

        return {
            testCase: index + 1,
            passed,
            stdout,
            expected: expected_output,
            stderr: result.stderr,
            compileOutput: result.compile_output || null,
            status: result.status.description,
            memory: result.memory ? `${result.memory}KB` : undefined,
            time: result.time ? `${result.time}s` : undefined,
        };
    });

    console.log(`<-------- Printing detailed output -------->`);
    console.log(detailedResult);

    /** @description Store submission summary in DB */
    const submission = await prisma.submission.create({
        data: {
            userId,
            problemId,
            sourceCode: source_code,
            language: getLanguageNameById(language_id),
            stdin: stdin.join("\n"),
            stdout: JSON.stringify(detailedResult.map((res) => res.stdout)),
            stderr: detailedResult.some((res) => res.stderr)
                ? JSON.stringify(detailedResult.map((res) => res.stderr))
                : null,
            compileOutput: detailedResult.some((res) => res.compile_output)
                ? JSON.stringify(
                      detailedResult.map((res) => res.compile_output),
                  )
                : null,
            status: allPassed ? Status.ACCEPTED : Status.WRONG,
            memory: detailedResult.some((res) => res.memory)
                ? JSON.stringify(detailedResult.map((res) => res.memory))
                : null,
            time: detailedResult.some((res) => res.time)
                ? JSON.stringify(detailedResult.map((res) => res.time))
                : null,
        },
    });

    /**
     * @description if allpassed = true (sabhi testcases passed) then
     * Mark problem as solved for the current User
     */
    if (allPassed) {
        await prisma.problemSolved.upsert({
            where: {
                userId_problemId: {
                    userId,
                    problemId,
                },
            },
            update: {},
            create: {
                userId,
                problemId,
            },
        });
    }

    /** @description Save Individual testcase results using detailedResult */
    const testCaseResult = detailedResult.map((result) => ({
        submissionId: submission.id,
        textCase: result.testCase,
        passed: result.passed,
        stdout: result.stdout,
        expected: result.expected,
        stderr: result.stderr,
        compileOutput: result.compileOutput,
        status: result.status,
        memory: result.memory,
        time: result.time,
    }));

    await prisma.testCaseResult.createMany({
        data: testCaseResult,
    });

    const submissionWithTestCase = await prisma.submission.findUnique({
        where: {
            id: submission.id,
        },
        include: {
            testCases: true,
        },
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { submission: submissionWithTestCase },
                "Code Executed Successfully!",
            ),
        );
});

const runCode = asyncHandler(async (req, res) => {
    const { source_code, language_id, stdin } = req.body;

    if (!Array.isArray(stdin) || stdin.length === 0) {
        throw new ApiError(400, "Invalid or missing test cases");
    }

    const submissions = stdin.map((input) => ({
        source_code,
        language_id,
        stdin: input,
    }));

    const submitResponse = await submitBatch(submissions);
    const tokens = submitResponse.map((res) => res.token);

    const result = await pollBatchResults(tokens);

    return res
        .status(200)
        .json(new ApiResponse(200, { results: result }, "Code executed!"));
});

export { executeCode, runCode };
