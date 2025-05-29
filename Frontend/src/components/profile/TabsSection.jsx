import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlaylists } from "../../features/playlist/playlistThunks";
import { getAllSubmissions } from "../../features/submission/submissionThunks";
import { formatDistanceToNow } from "date-fns";
import SubmissionModal from "./SubmissionModal";

const TabsSection = () => {
  const [activeTab, setActiveTab] = useState("recent");
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const { playlists, isLoading: isPlaylistsLoading } = useSelector(
    (state) => state.playlist,
  );
  const { submissions, isLoading: isSubmissionLoading } = useSelector(
    (state) => state.submission,
  );

  useEffect(() => {
    if (activeTab === "list") {
      dispatch(getAllPlaylists());
    } else if (activeTab === "recent") {
      dispatch(getAllSubmissions());
    }
  }, [dispatch, activeTab]);

  console.log("Playlists: ", playlists);
  console.log("Submission: ", submissions);

  const recentSubmissions = [...submissions]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 10);

  const handleOpenModal = (submission) => {
    setSelectedSubmission(submission);
    setShowModal(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-[#000814] home-gradient text-white p-4 rounded-lg">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("recent")}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === "recent"
              ? "bg-teal-600 outline-none text-white hover:bg-teal-700 cursor-pointer transition-all duration-300"
              : "bg-[#0A1128] outline-none border border-gray-600 hover:bg-[#242d4aea] cursor-pointer transition-all duration-300"
          }`}
        >
          Recent Submissions
        </button>
        <button
          onClick={() => setActiveTab("list")}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === "list"
              ? "bg-teal-600 outline-none text-white hover:bg-teal-700 cursor-pointer transition-all duration-300"
              : "bg-[#0A1128] outline-none border border-gray-600 hover:bg-[#242d4aea] cursor-pointer transition-all duration-300 "
          }`}
        >
          Playlists
        </button>
      </div>

      <div className="space-y-2">
        {activeTab === "recent" &&
          recentSubmissions.map((submission, idx) => (
            <div
              key={idx}
              className="flex justify-between bg-[#0A1128] px-4 py-4 rounded-md border border-gray-700"
              onClick={() => handleOpenModal(submission)}
            >
              <span>{submission?.problem?.title}</span>
              <span className="text-gray-400 text-sm">
                {formatDistanceToNow(new Date(submission.updatedAt))} ago
              </span>
            </div>
          ))}

        {activeTab === "list" &&
          playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="flex justify-between bg-[#0A1128] px-4 py-4 rounded-md border border-gray-700"
            >
              <span>{playlist?.name}</span>
              <span className="text-gray-400 text-sm">
                {playlist?.problems?.length} problems
              </span>
            </div>
          ))}
      </div>
      <SubmissionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        submission={selectedSubmission}
      />
    </div>
  );
};

export default TabsSection;
