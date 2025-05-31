import { createSlice } from "@reduxjs/toolkit";
import { executeCode, runCode } from "./executionThunks";

const initialState = {
  submission: null,
  results: null,
  error: null,
  isExecuting: false,
  isRunning: false,
};

const executionSlice = createSlice({
  name: "execution",
  initialState,
  reducers: {
    clearExecutionSubmission: (state) => {
      state.submission = null;
      state.error = null;
      state.isExecuting = false;
    },
    clearResults: (state) => {
      state.results = null;
      state.statusMessage = "";
      state.error = null;
      state.isRunning = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(executeCode.pending, (state) => {
        state.error = null;
        state.isExecuting = true;
        state.submission = null;
      })
      .addCase(executeCode.fulfilled, (state, action) => {
        state.submission = action.payload;
        state.isExecuting = false;
        state.error = null;
      })
      .addCase(executeCode.rejected, (state, action) => {
        state.isExecuting = false;
        state.error = action.payload;
        action.submission = null;
      })
      .addCase(runCode.pending, (state) => {
        state.isRunning = true;
        state.error = null;
        state.results = null;
      })
      .addCase(runCode.fulfilled, (state, action) => {
        state.isRunning = false;
        state.results = action.payload;
        state.error = null;
      })
      .addCase(runCode.rejected, (state, action) => {
        state.isRunning = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearExecutionSubmission } = executionSlice.actions;
export default executionSlice.reducer;
