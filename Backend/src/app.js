import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }),
);

/** @description import routers */
import healthcheckRouter from "./routes/healthcheck.routes.js";
import authRouter from "./routes/auth.routes.js";
import problemRouter from "./routes/problem.routes.js";
import executionRouter from "./routes/codeExecution.routes.js";
import submissionRouter from "./routes/submission.routes.js";

/** @description initialize api routes */
app.use("/api/v1/health", healthcheckRouter);
app.use("/api/v1/users", authRouter);
app.use("/api/v1/problems", problemRouter);
app.use("/api/v1/code", executionRouter);
app.use("/api/v1/submission", submissionRouter);

export default app;
