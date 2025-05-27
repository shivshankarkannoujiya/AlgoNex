import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../Service/apiClient";

const getAllSubmissions = createAsyncThunk(
  "/submission/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await apiClient.getAllSubmissions();
      console.log(res);
      console.log(res.data);
      console.log(res.data.submissions);
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
      console.log(res);
      console.log(res.data);
      console.log(res.data.submissions);
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
      console.log(res);
      console.log(res.data);
      console.log(res.data.submissionCount);
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
