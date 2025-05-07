import { prisma } from "../lib/db.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { submitBatch, pollBatchResults } from "../lib/Judge0.lib.js";

const executeCode = asyncHandler(async (req, res) => {
    const { source_code, language_id, stdin, expected_outputs, problemId } =
        req.body;
    const userId = req.user?.id;

    if (
        !Array.isArray(stdin) ||
        stdin.length === 0 ||
        !Array.isArray(expected_outputs) ||
        expected_outputs.length === 0
    ) {
        throw new ApiError(400, "Invalid or Missing test cases");
    }

    /** @description prepare each testcases for judge0 batch submission */
    const submissions = stdin.map((input) => ({
        source_code,
        language_id,
        stdin: input,
    }));

    /** @description Send the batch of submissions to judge0 */
    const submitResponse = await submitBatch(submissions);
    const tokens = submitResponse.map((res) => res.token);

    /** @description Poll judge0 for the results of all submitted testcases */
    const result = await pollBatchResults(tokens);

    console.log(`Execute Result -------------> `);
    console.log(result);

    return res.status(200).json(new ApiResponse("Code Executed !"));
});

export { executeCode };
