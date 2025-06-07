import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js"
import problemReducer from "../features/problem/problemSlice.js";
import executionReducer from "../features/execution/executionSlice.js";
import submissionReducer from "../features/submission/submissionSlice.js";
import playlistReducer from "../features/playlist/playlistSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    problems: problemReducer,
    execution: executionReducer,
    submission: submissionReducer,
    playlist: playlistReducer,
  },
});

export default store;
