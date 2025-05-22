import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClinet from "../../Service/apiClient";

const loginUser = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            return await apiClinet.login(email, password);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

const signupUser = createAsyncThunk(
    "auth/signup",
    async ({ username, email, password }, thunkAPI) => {
        try {
            return await apiClinet.signup(username, email, password);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

const getCurrentUser = createAsyncThunk("auth/getMe", async (_, thunkAPI) => {
    try {
        return await apiClinet.getMe();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const logoutUser = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        return await apiClinet.logout();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const verifyEmail = createAsyncThunk(
    "auth/verifyEmail",
    async (token, { rejectWithValue }) => {
        try {
            const response = await apiClinet.verifyEmail(token);
            return response?.data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || "Verification failed",
            );
        }
    },
);

export { loginUser, signupUser, getCurrentUser, logoutUser, verifyEmail };
