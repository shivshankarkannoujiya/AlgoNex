import { ZodError } from "zod";
import { ApiError } from "../utils/api-error.js";

function validate(schema, property = "body") {
    return function (req, _, next) {
        try {
            const dataToValidate = req[property];
            const validatedData = schema.parse(dataToValidate);
            req[property] = validatedData;
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                error.errors.map((err) => {
                    return {
                        field: err.path.join("."),
                        message: err.message,
                    };
                });

                const validationError = new ApiError(
                    422,
                    "Validation Failed",
                    error,
                );
                return next(validationError);
            }

            next(error);
        }
    };
}

export { validate };
