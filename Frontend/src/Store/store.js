import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import problemReducer from "../features/problem/problemSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        problems: problemReducer,
    },
});

export default store;
