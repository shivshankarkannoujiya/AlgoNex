import { createSlice } from "@reduxjs/toolkit";
import {
  createPlaylist,
  getAllPlaylists,
  getPlaylistDetail,
  addProblemToPlaylist,
  deletePlaylist,
  removeProblemFromPlaylist,
  updatePlaylist,
} from "./playlistThunks";

const initialState = {
  playlists: [],
  currentPlaylist: null,
  isLoading: false,
  error: null,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    resetPlaylist: (state) => {
      state.playlists = [];
      state.currentPlaylist = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPlaylist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.playlists.push(action.payload);
      })
      .addCase(createPlaylist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getAllPlaylists.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllPlaylists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.playlists = action.payload;
      })
      .addCase(getAllPlaylists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getPlaylistDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPlaylistDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPlaylist = action.payload;
      })
      .addCase(getPlaylistDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addProblemToPlaylist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addProblemToPlaylist.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.currentPlaylist) {
          state.currentPlaylist.problems = action.payload;
        }
      })
      .addCase(addProblemToPlaylist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(removeProblemFromPlaylist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeProblemFromPlaylist.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.currentPlaylist) {
          state.currentPlaylist.problems =
            state.currentPlaylist.problems.filter(
              (problem) =>
                !action.payload.some(
                  (removed) => removed.problemId === problem.id,
                ),
            );
        }
      })
      .addCase(removeProblemFromPlaylist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deletePlaylist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePlaylist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.playlists = state.playlists.filter(
          (playlist) => playlist.id !== action.payload.id,
        );
        if (state.currentPlaylist?.id === action.payload.id) {
          state.currentPlaylist = null;
        }
      })
      .addCase(deletePlaylist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updatePlaylist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePlaylist.fulfilled, (state, action) => {
        state.isLoading = false;
        const updated = action.payload;

        const index = state.playlists.findIndex((p) => p.id === updated.id);
        if (index !== -1) {
          state.playlists[index] = updated;
        }

        if (state.currentPlaylist?.id === updated.id) {
          state.currentPlaylist = {
            ...state.currentPlaylist,
            ...updated,
          };
        }
      })

      .addCase(updatePlaylist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;
