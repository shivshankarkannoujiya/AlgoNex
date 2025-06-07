import { createSlice } from "@reduxjs/toolkit";
import {
    getCurrentUser,
    loginUser,
    signupUser,
    logoutUser,
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
        };

        const handleRejected = (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        };

        builder
            .addCase(getCurrentUser.pending, handlePending)
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = !!action.payload;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.user = null;
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.error.message;
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
    },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
