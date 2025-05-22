import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, loginUser, signupUser, logoutUser, verifyEmail } from "./authThunks";


const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetAuthState: (state) => {
            state.user = null
            state.loading = false
            state.error = null
            state.isAuthenticated = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getCurrentUser.rejected, (state) => {
                state.user = null
                state.isAuthenticated = false
                state.loading = false
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.isAuthenticated = true
                state.loading = false
            })
            .addCase(signupUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.isAuthenticated = false
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.isAuthenticated = true
                state.loading = false
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.isAuthenticated = false
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.isAuthenticated = true
                state.loading = false
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null
                state.isAuthenticated = false
                state.loading = false
                state.error = null
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(verifyEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(verifyEmail.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
              })
              .addCase(verifyEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
              });
    }
})

export const { resetAuthState } = authSlice.actions
export default authSlice.reducer