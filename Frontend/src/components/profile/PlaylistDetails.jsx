import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPlaylistDetail,
  updatePlaylist,
} from "../../features/playlist/playlistThunks";
import { FaPlay, FaPlus, FaEdit, FaList } from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";

const COLORS = ["#14b8a6", "#facc15", "#ef4444"];

const EditPlaylistModal = ({
  isOpen,
  onClose,
  name,
  description,
  setName,
  setDescription,
  onSave,
  currentPlaylist,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#0A1128] p-6 rounded-lg w-full max-w-md border border-gray-700 text-white">
        <h2 className="text-xl font-bold mb-4">Edit Playlist</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 rounded-md text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 rounded-md text-white"
            rows={3}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={!currentPlaylist || !currentPlaylist.id}
            className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const PlaylistDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentPlaylist, isLoading } = useSelector((state) => state.playlist);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    dispatch(getPlaylistDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentPlaylist) {
      setNewName(currentPlaylist.name);
      setNewDescription(currentPlaylist.description || "");
    }
  }, [currentPlaylist]);

  const problems = currentPlaylist?.problems || [];
  const total = problems.length;

  const easy = problems.filter((p) => p.problem.difficulty === "EASY").length;
  const medium = problems.filter(
    (p) => p.problem.difficulty === "MEDIUM",
  ).length;
  const hard = problems.filter((p) => p.problem.difficulty === "HARD").length;

  const pieData = [
    { name: "Easy", value: easy },
    { name: "Medium", value: medium },
    { name: "Hard", value: hard },
  ];

  const handlePractice = () => {
    const random = problems[Math.floor(Math.random() * problems.length)];
    if (random) navigate(`/problem/${random.problem.id}`);
  };

  const handleEditOpen = () => setIsEditOpen(true);
  const handleEditClose = () => setIsEditOpen(false);

  const handleSave = async () => {
    try {
      await dispatch(
        updatePlaylist({
          id: currentPlaylist.id,
          name: newName,
          description: newDescription,
        }),
      );
    } catch (err) {
      console.error("Unexpected error during playlist update:", err);
    } finally {
      setIsEditOpen(false);
    }
  };

  if (isLoading || !currentPlaylist) {
    return (
      <div className="text-white flex items-center justify-center h-screen bg-[#000814] home-gradient">
        <div className="animate-spin h-10 w-10 border-4 border-teal-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000814] home-gradient">
      <div className="flex flex-col lg:flex-row min-h-screen text-white max-w-7xl mx-auto py-10">
        <div className="w-full lg:w-[360px] p-6 bg-[#0A1128] rounded-md shadow-lg flex flex-col justify-between h-[400px]">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-teal-600 rounded-md p-2">
                <FaList className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{currentPlaylist.name}</h2>
                <p className="text-sm text-gray-400">
                  Total · {total} questions
                </p>
              </div>
            </div>

            <div className="flex space-x-2 mb-6">
              <button
                onClick={handlePractice}
                className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-md text-sm font-medium"
              >
                <FaPlay />
                <span>Practice</span>
              </button>
              <button className="bg-gray-700 px-3 py-2 rounded-md">
                <FaPlus />
              </button>
              <button
                onClick={handleEditOpen}
                className="bg-gray-700 px-3 py-2 rounded-md"
              >
                <FaEdit />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#0A1128] rounded-lg p-4 text-center shadow-md border border-gray-700">
                <div className="text-teal-400 text-sm font-medium">Easy</div>
                <div className="text-xl font-bold text-white">
                  {easy} / {total}
                </div>
              </div>
              <div className="bg-[#0A1128] rounded-lg p-4 text-center shadow-md border border-gray-700">
                <div className="text-yellow-400 text-sm font-medium">
                  Medium
                </div>
                <div className="text-xl font-bold text-white">
                  {medium} / {total}
                </div>
              </div>
              <div className="bg-[#0A1128] rounded-lg p-4 text-center shadow-md border border-gray-700">
                <div className="text-red-400 text-sm font-medium">Hard</div>
                <div className="text-xl font-bold text-white">
                  {hard} / {total}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-36 mt-6 text-white">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={40}
                  outerRadius={60}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                  <Label
                    value={total}
                    position="center"
                    fill="#fff"
                    fontSize={16}
                    fontWeight="bold"
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex-1 p-6">
          {problems.map(({ problem }, index) => (
            <div
              key={problem.id}
              onClick={() => navigate(`/problem/${problem.id}`)}
              className="max-w-3xl mx-auto bg-[#0A1128] border border-gray-700 p-4 rounded-md mb-4 cursor-pointer hover:bg-[#191e32] transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold">
                  {index + 1}. {problem.title}
                </div>
                <div
                  className={`text-sm font-medium ${
                    problem.difficulty === "EASY"
                      ? "text-teal-400"
                      : problem.difficulty === "MEDIUM"
                        ? "text-yellow-400"
                        : "text-red-400"
                  }`}
                >
                  {problem.difficulty}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <EditPlaylistModal
        isOpen={isEditOpen}
        onClose={handleEditClose}
        name={newName}
        description={newDescription}
        setName={setNewName}
        setDescription={setNewDescription}
        onSave={handleSave}
        currentPlaylist={currentPlaylist}
      />
    </div>
  );
};

export default PlaylistDetails;
