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
        origin: ["https://www.algonex.in", "http://localhost:5173"],
        credentials: true,
    }),
);

/** @description import routers */
import healthcheckRouter from "./routes/healthcheck.routes.js";
import authRouter from "./routes/auth.routes.js";
import problemRouter from "./routes/problem.routes.js";
import executionRouter from "./routes/codeExecution.routes.js";
import submissionRouter from "./routes/submission.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import postRouter from "./routes/post.routes.js";
import commentRouter from "./routes/comment.routes.js";

/** @description initialize api routes */
app.use("/api/v1/health", healthcheckRouter);
app.use("/api/v1/users", authRouter);
app.use("/api/v1/problems", problemRouter);
app.use("/api/v1/code", executionRouter);
app.use("/api/v1/submission", submissionRouter);
app.use("/api/v1/playlist", playlistRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comment", commentRouter);

export default app;
