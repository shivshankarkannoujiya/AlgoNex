import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../Service/apiClient";

const getAllSubmissions = createAsyncThunk(
  "/submission/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await apiClient.getAllSubmissions();
      return res.data.submissions;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const getSubmissionForProblem = createAsyncThunk(
  "/submission/getAllforProblem",
  async (id, thunkAPI) => {
    try {
      const res = await apiClient.getSubmissionForProblem(id);
      return res.data.submissions;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const getSubmissionCountForProblem = createAsyncThunk(
  "/submission/getSubmissionCount",
  async (id, thunkAPI) => {
    try {
      const res = await apiClient.getSubmissionCountForProblem(id);
      return res.data.submissionCount;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export {
  getAllSubmissions,
  getSubmissionForProblem,
  getSubmissionCountForProblem,
};
