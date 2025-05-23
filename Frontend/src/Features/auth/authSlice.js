import { createSlice } from "@reduxjs/toolkit";
import {
    getCurrentUser,
    loginUser,
    signupUser,
    logoutUser,
    verifyEmail,
} from "./authThunks";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetAuthState: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            localStorage.removeItem("isLoggedIn");
        },
    },
    extraReducers: (builder) => {
        const handlePending = (state) => {
            state.loading = true;
            state.error = null;
            state.status = "loading";
        };

        const handleRejected = (state, action) => {
            state.loading = false;
            state.error = action.payload;
        };

        builder
            .addCase(getCurrentUser.pending, handlePending)
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = !!action.payload;
            })
            .addCase(getCurrentUser.rejected, (state) => {
                state.user = null;
                state.loading = false;
                state.isAuthenticated = false;
                state.error = "Session expired. Please login again.";
            })

            .addCase(signupUser.pending, handlePending)
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(signupUser.rejected, handleRejected)

            .addCase(loginUser.pending, handlePending)
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, handleRejected)

            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.error = null;
                state.loading = false;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.rejected, handleRejected)

            .addCase(verifyEmail.pending, handlePending)
            .addCase(verifyEmail.fulfilled, (state) => {
                state.error = null;
                state.loading = false;
            })
            .addCase(verifyEmail.rejected, handleRejected);
    },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
