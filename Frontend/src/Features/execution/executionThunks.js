import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../Service/apiClient";

export const executeCode = createAsyncThunk(
  "/code/execute",
  async (codeExecutionData, thunkAPI) => {
    try {
      const res = await apiClient.executeCode(codeExecutionData);
      console.log(res);
      console.log(res.data);
      console.log(res.data.submission);
      return res.data.submission;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
