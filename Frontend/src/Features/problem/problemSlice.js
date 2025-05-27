import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProblems,
  getProblemById,
  getSolvedProblemByUser,
  deleteProblem,
} from "./problemThunks";

const initialState = {
  problems: [],
  solvedProblems: [],
  problem: null,
  error: null,
  isProblemsLoading: false,
  isProblemLoading: false,
  isDeletingProblem: false,
  isSolvedProblemsLoading: false,
};

const problemSlice = createSlice({
  name: "problems",
  initialState,
  reducers: {
    resetProblems: (state) => {
      state.problems = [];
      state.solvedProblems = [];
      state.problem = null;
      state.error = null;
      state.isProblemLoading = false;
      state.isProblemsLoading = false;
      state.isSolvedProblemsLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProblems.pending, (state) => {
        state.error = null;
        state.isProblemsLoading = true;
      })
      .addCase(getAllProblems.fulfilled, (state, action) => {
        state.error = null;
        state.isProblemsLoading = false;
        state.problems = action.payload;
      })
      .addCase(getAllProblems.rejected, (state, action) => {
        state.isProblemsLoading = false;
        state.error = action.error.message;
      })
      .addCase(getProblemById.pending, (state) => {
        state.error = null;
        state.isProblemLoading = true;
      })
      .addCase(getProblemById.fulfilled, (state, action) => {
        state.error = null;
        state.isProblemLoading = false;
        state.problem = action.payload;
      })
      .addCase(getProblemById.rejected, (state, action) => {
        state.isProblemLoading = false;
        state.error = action.error.message;
      })
      .addCase(getSolvedProblemByUser.pending, (state) => {
        state.error = null;
        state.isSolvedProblemsLoading = true;
      })
      .addCase(getSolvedProblemByUser.fulfilled, (state, action) => {
        state.error = null;
        state.isSolvedProblemsLoading = false;
        state.solvedProblems = action.payload;
      })
      .addCase(getSolvedProblemByUser.rejected, (state, action) => {
        state.isSolvedProblemsLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProblem.pending, (state) => {
        state.error = null;
        state.isDeletingProblem = true;
      })
      .addCase(deleteProblem.fulfilled, (state) => {
        state.error = null;
        state.isDeletingProblem = false;
        const deletedId = action.meta.arg;
        state.problems = state.problems.filter((p) => p.id !== deletedId);
        if (state.problem?.id === deletedId) {
          state.problem = null;
        }
      })
      .addCase(deleteProblem.rejected, (state, action) => {
        state.isDeletingProblem = false;
        state.error = action.payload;
      });
  },
});

export const { resetProblems } = problemSlice.actions;
export default problemSlice.reducer;
