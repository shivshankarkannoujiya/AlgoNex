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
      console.log("Thunk Res: ", res);
      console.log("Thunk Res2: ", res.data.submission)
      return res.data.submission;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
