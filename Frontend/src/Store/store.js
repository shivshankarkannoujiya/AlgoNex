import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import problemReducer from "../features/problem/problemSlice";
import executionReducer from "../features/execution/executionSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        problems: problemReducer,
        execution: executionReducer
    },
});

export default store;
