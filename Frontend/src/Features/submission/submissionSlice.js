import { createSlice } from "@reduxjs/toolkit";
import {
  getAllSubmissions,
  getSubmissionCountForProblem,
  getSubmissionForProblem,
} from "./submissionThunks";

const initialState = {
  submissions: [],
  submission: null,
  submissionCount: null,
  isLoading: false,
  error: null,
};

const submissionSlice = createSlice({
  name: "submission",
  initialState,
  reducers: {
    resetSubmission: (state) => {
      state.submissions = [];
      state.submission = null;
      state.submissionCount = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSubmissions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllSubmissions.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.submissions = action.payload;
      })
      .addCase(getAllSubmissions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getSubmissionForProblem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSubmissionForProblem.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.submission = action.payload;
      })
      .addCase(getSubmissionForProblem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getSubmissionCountForProblem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSubmissionCountForProblem.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.submissionCount = action.payload;
      })
      .addCase(getSubmissionCountForProblem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSubmission } = submissionSlice.actions;
export default submissionSlice.reducer;
