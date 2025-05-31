import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../Service/apiClient";
import { toast } from "react-toastify";

const createPlaylist = createAsyncThunk(
  "playlist/create",
  async ({ name, description }, thunkAPI) => {
    try {
      const res = await apiClient.createPlaylist({ name, description });
      toast.success("Playlist created successfully");
      return res.data.playlist;
    } catch (error) {
      const message =
        error.response?.data?.error || "Failed to create playlist";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const getAllPlaylists = createAsyncThunk(
  "playlist/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await apiClient.getAllPlaylists();
      return res.data.playlists;
    } catch (error) {
      toast.error("Failed to fetch playlists");
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const getPlaylistDetail = createAsyncThunk(
  "playlist/getDetails",
  async (playlistId, thunkAPI) => {
    try {
      const res = await apiClient.getPlaylistDetail(playlistId);
      return res.data.playlist;
    } catch (error) {
      toast.error("Failed to fetch playlist details");
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const addProblemToPlaylist = createAsyncThunk(
  "playlist/addProblem",
  async ({ playlistId, problemIds }, thunkAPI) => {
    try {
      const res = await apiClient.addProblemToPlaylist(playlistId, problemIds);
      toast.success("Problem added to playlist");
      return res.data.problemsInPlaylist;
    } catch (error) {
      toast.error("Failed to add problem to playlist");
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const deletePlaylist = createAsyncThunk(
  "playlist/delete",
  async (playlistId, thunkAPI) => {
    try {
      const res = await apiClient.deletePlaylist(playlistId);
      toast.success("Playlist deleted successfully");
      return res.data.deletedPlaylist;
    } catch (error) {
      toast.error("Failed to delete playlist");
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const removeProblemFromPlaylist = createAsyncThunk(
  "playlist/removeProblem",
  async ({ playlistId, problemIds }, thunkAPI) => {
    try {
      const res = await apiClient.removeProblemFromPlaylist(
        playlistId,
        problemIds,
      );
      toast.success("Problem(s) removed from playlist");
      return res.data.deletedProblems;
    } catch (error) {
      toast.error("Failed to remove problem(s) from playlist");
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const updatePlaylist = createAsyncThunk(
  "playlist/update",
  async ({ id, name, description }, thunkAPI) => {
    try {
      const res = await apiClient.updatePlaylist({
        id,
        name,
        description,
      });
      return res.data.playlist;
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.message ||
        "Failed to update playlist";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export {
  createPlaylist,
  getAllPlaylists,
  getPlaylistDetail,
  addProblemToPlaylist,
  removeProblemFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
