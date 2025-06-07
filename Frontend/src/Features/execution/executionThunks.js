import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../Service/apiClient";

export const executeCode = createAsyncThunk(
  "/code/execute",
  async (
    { source_code, language_id, stdin, expected_outputs, problemId },
    thunkAPI,
  ) => {
    try {
      const res = await apiClient.executeCode({
        source_code,
        language_id,
        stdin,
        expected_outputs,
        problemId,
      });
      return res.data.submission;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const runCode = createAsyncThunk(
  "/code/run",
  async (
    { source_code, language_id, stdin, expected_outputs, problemId },
    thunkAPI,
  ) => {
    try {
      const res = await apiClient.runCode({
        source_code,
        language_id,
        stdin,
        expected_outputs,
        problemId,
      });
      return res.data.results;
    } catch (error) {
      thunkAPI.rejectWithValue(
        error?.response?.data?.message || error.message || "Unknown error",
      );
    }
  },
);
