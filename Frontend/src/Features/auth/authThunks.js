import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../Service/apiClient";

const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await apiClient.login(email, password);
      sessionStorage.setItem("isLoggedIn", "true");
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const signupUser = createAsyncThunk(
  "auth/signup",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const res = await apiClient.signup(username, email, password);
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const getCurrentUser = createAsyncThunk("auth/getMe", async (_, thunkAPI) => {
  try {
    const res = await apiClient.getMe();

    if (res.data) {
      return res.data;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("getCurrentUser error:", error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

const logoutUser = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await apiClient.logout();
    sessionStorage.removeItem("isLoggedIn");
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token, thunkAPI) => {
    try {
      const response = await apiClient.verifyEmail(token);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Verification failed");
    }
  },
);

export { loginUser, signupUser, getCurrentUser, logoutUser, verifyEmail };
