import { ApiResponse } from "../utility/api-response";
import { asyncHandler } from "../utility/asyncHandler";

const healthCheck = asyncHandler(async (_, res) => {
    res.status(200).json(
        new ApiResponse(200, { message: "Server is running" }),
    );
});

export { healthCheck };
