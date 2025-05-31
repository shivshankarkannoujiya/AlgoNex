import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../Service/apiClient";

const getAllProblems = createAsyncThunk(
  "problem/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await apiClient.getAllProblems();
      console.log(res);
      console.log(res.data);
      console.log(res.data.problems);
      return res.data?.problems;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const getProblemById = createAsyncThunk(
  "problem/getById",
  async (id, thunkAPI) => {
    try {
      const res = await apiClient.getProblemById(id);
      console.log(res);
      console.log(res.data);
      console.log(res.data.problem);
      return res.data?.problem;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const getSolvedProblemByUser = createAsyncThunk(
  "/problem/solved",
  async (_, thunkAPI) => {
    try {
      const res = await apiClient.getSolvedProblem();
      console.log(res);
      console.log(res.data);
      console.log(res.data.problems);
      return res.data?.problems;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const deleteProblem = createAsyncThunk(
  "/problem/delete",
  async (id, thunkAPI) => {
    try {
      await apiClient.deleteProblem(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const updateProblem = createAsyncThunk(
  "/problem/update",
  async ({ id, problemData }, thunkAPI) => {
    try {
      const res = await apiClient.updateProblem(id, problemData);
      return res.data?.problem;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  },
);

export {
  getAllProblems,
  getProblemById,
  getSolvedProblemByUser,
  deleteProblem,
  updateProblem,
};
