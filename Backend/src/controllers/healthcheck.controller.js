import { ApiResponse } from "../utility/api-response.js";
import { asyncHandler } from "../utility/asyncHandler.js";

const healthCheck = asyncHandler(async (_, res) => {
    res.status(200).json(
        new ApiResponse(200, { message: "Server is running" }),
    );
});

export { healthCheck };
