import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProblems,
  getProblemById,
  getSolvedProblemByUser,
  deleteProblem,
  updateProblem
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
  isUpdatingProblem: false,
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
      state.isUpdatingProblem = false;
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
      })
      .addCase(updateProblem.pending, (state) => {
        state.error = null;
        state.isUpdatingProblem = true;
      })
      .addCase(updateProblem.fulfilled, (state, action) => {
        state.error = null;
        state.isUpdatingProblem = false;
        state.problem = action.payload;

        const index = state.problems.findIndex(
          (p) => p.id === action.payload.id,
        );
        if (index !== -1) {
          state.problems[index] = action.payload;
        }
      })
      .addCase(updateProblem.rejected, (state, action) => {
        state.isUpdatingProblem = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetProblems } = problemSlice.actions;
export default problemSlice.reducer;
