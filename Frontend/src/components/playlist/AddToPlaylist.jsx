import { useEffect, useState } from "react";
import { X, Loader, Plus } from "lucide-react";
import {
  addProblemToPlaylist,
  getAllPlaylists,
} from "../../features/playlist/playlistThunks";
import { useDispatch, useSelector } from "react-redux";

const AddToPlaylist = ({ isOpen, onClose, problemIds }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  const dispatch = useDispatch();
  const { playlists, isLoading } = useSelector((state) => state.playlist);

  useEffect(() => {
    if (isOpen) {
      dispatch(getAllPlaylists());
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlaylist || !problemIds) return;
    await dispatch(
      addProblemToPlaylist({
        playlistId: selectedPlaylist,
        problemIds: Array.isArray(problemIds) ? problemIds : [problemIds],
      }),
    );
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-md">
        {" "}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          {" "}
          <h3 className="text-xl font-bold">Add to Playlist</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="mb-4">
            {" "}
            <label className="block text-sm font-medium text-gray-200 mb-1">
              {" "}
              Select Playlist
            </label>
            <select
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-sm text-gray-100 shadow-sm transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
              value={selectedPlaylist}
              onChange={(e) => setSelectedPlaylist(e.target.value)}
              disabled={isLoading}
            >
              <option value="" disabled className="bg-[#0a0a0a] text-gray-100">
                Select a playlist
              </option>
              {playlists.map((playlist) => (
                <option
                  key={playlist.id}
                  value={playlist.id}
                  className="bg-[#111827] text-white hover:bg-teal-600"
                >
                  {playlist.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-100 bg-gray-800 border border-gray-400 rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:teal-teal-500 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              disabled={!selectedPlaylist || isLoading}
            >
              {isLoading ? (
                <Loader className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Plus className="w-4 h-4 mr-2" />
              )}
              Add to Playlist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddToPlaylist;
