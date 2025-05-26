import { createSlice } from "@reduxjs/toolkit";
import { executeCode } from "./executionThunks";


const initialState = {
    submission: null,
    error: null,
    isExecuting: false,
}


const executionSlice = createSlice({
    name: "execution",
    initialState,
    reducers: {
        resetExecution: (state) => {
            state.submission = null
            state.error = null
            state.isExecuting = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(executeCode.pending, (state) => {
                state.error = null
                state.isExecuting = true
            })
            .addCase(executeCode.fulfilled, (state, action) => {
                state.submission = action.payload
                state.isExecuting = false
                state.error = null
            })
            .addCase(executeCode.rejected, (state, action) => {
                state.isExecuting = false
                state.error = action.payload
            })
    }
});

export const { resetExecution } = executionSlice.actions
export default executionSlice.reducer