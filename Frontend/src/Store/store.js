import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import problemReducer from "../features/problem/problemSlice";
import executionReducer from "../features/execution/executionSlice";
import submissionReducer from "../features/submission/submissionSlice";
import playlistReducer from "../features/playlist/playlistSlice";

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
