import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Bookmark,
  PencilIcon,
  TrashIcon,
  Plus,
  CheckCircle,
  CircleDashed,
} from "lucide-react";
import { deleteProblem } from "../../features/problem/problemThunks";
import { createPlaylist } from "../../features/playlist/playlistThunks";
import { CreatePlaylistModel, AddToPlaylist } from "../index";

const ProblemTable = ({ problems }) => {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState(null);
  const [isCreateModelOpen, setIsCreateModelOpen] = useState(false);
  const [isAddToPlaylistModelOpen, setIsAddToPlaylistModelOpen] =
    useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const allTags = useMemo(() => {
    if (!Array.isArray(problems)) return [];
    const tagsSet = new Set();
    problems.forEach((problem) =>
      problem.tags?.forEach((tag) => tagsSet.add(tag)),
    );
    return Array.from(tagsSet);
  }, [problems]);

  const difficulties = ["EASY", "MEDIUM", "HARD"];

  const filteredProblems = useMemo(() => {
    return (problems || [])
      .filter((problem) =>
        problem.title.toLowerCase().includes(search.toLowerCase()),
      )
      .filter((problem) =>
        difficulty === "ALL" ? true : problem.difficulty === difficulty,
      )
      .filter((problem) =>
        selectedTag === "ALL" ? true : problem.tags?.includes(selectedTag),
      );
  }, [problems, search, difficulty, selectedTag]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const paginatedProblems = useMemo(() => {
    return filteredProblems.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    );
  }, [filteredProblems, currentPage]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    setDeletingId(id);
    try {
      await dispatch(deleteProblem(id)).unwrap();
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error(error || "Failed to delete");
    } finally {
      setDeletingId(null);
    }
  };

  const handleAddToPlaylist = async (problemId) => {
    setSelectedProblemId(problemId);
    setIsAddToPlaylistModelOpen(true);
  };

  const handleCreatePlaylist = async (data) => {
    await dispatch(createPlaylist(data));
  };

  return (
    <div className="w-full px-4 py-8  rounded-2xl shadow-xl overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-white">Problems</h2>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-white font-medium shadow transition cursor-pointer"
          onClick={() => setIsCreateModelOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Create Playlist
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          className="bg-gray-900 border border-gray-500 px-4 py-2 rounded-md text-white w-full "
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="bg-gray-900 border border-gray-500 text-white px-4 py-2 rounded-md w-full"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="ALL">All Difficulties</option>
          {difficulties.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <select
          className="bg-gray-900 border border-gray-500 text-white px-4 py-2 rounded-md w-full"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="ALL">All Tags</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-800">
        <table className="w-full text-sm text-left text-gray-300 border-separate border-spacing-y-2">
          <thead className="text-xs uppercase bg-gray-900 text-gray-400">
            <tr>
              <th className="px-4 py-2">Solved</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Tags</th>
              <th className="px-4 py-2">Difficulty</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProblems.length > 0 ? (
              paginatedProblems.map((problem) => {
                const isSolved = problem.ProblemSolvedBy?.some(
                  (u) => u.userId === user?.id,
                );
                return (
                  <tr
                    key={problem.id}
                    className="bg-gray-900 hover:bg-gray-800 rounded-md"
                  >
                    <td className="px-4 py-3 text-center">
                      {isSolved ? (
                        <CheckCircle className="w-5 h-5 text-teal-500 mx-auto" />
                      ) : (
                        <CircleDashed className="w-5 h-5 text-gray-500 mx-auto" />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/problem/${problem.id}`}
                        className="text-white hover:underline"
                      >
                        {problem.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {(problem.tags || []).map((tag, idx) => (
                          <span
                            key={idx}
                            className="border border-yellow-500 text-yellow-400 text-xs px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full ${
                          problem.difficulty === "EASY"
                            ? "text-teal-400 border border-teal-500"
                            : problem.difficulty === "MEDIUM"
                              ? "text-yellow-400 border border-yellow-500"
                              : "text-red-400 border border-red-600"
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {user?.role === "ADMIN" && (
                          <>
                            <button
                              onClick={() => handleDelete(problem.id)}
                              disabled={deletingId === problem.id}
                              className="text-red-500 border border-red-500 px-2 py-1 rounded-md flex items-center gap-1 text-xs"
                            >
                              {deletingId === problem.id ? (
                                "Deleting..."
                              ) : (
                                <TrashIcon className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={() =>
                                navigate(`/admin/problems/edit/${problem.id}`)
                              }
                              className="text-gray-300 border border-gray-500 px-2 py-1 rounded-md text-xs flex items-center"
                            >
                              <PencilIcon className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleAddToPlaylist(problem.id)}
                          className="text-gray-300 border border-gray-500 px-2 py-1 rounded-md text-xs flex items-center gap-1"
                        >
                          <Bookmark className="w-4 h-4" />
                          <span className="hidden sm:inline">Save</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No problems found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 gap-4">
        <button
          className={`px-3 py-2 text-sm rounded-md ${
            currentPage === 1
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span className="px-4 py-2 text-white bg-gray-700 rounded-md text-sm">
          {currentPage} / {totalPages}
        </span>
        <button
          className={`px-3 py-2 text-sm rounded-md ${
            currentPage === totalPages
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      <CreatePlaylistModel
        isOpen={isCreateModelOpen}
        onClose={() => setIsCreateModelOpen(false)}
        onSubmit={handleCreatePlaylist}
      />
      <AddToPlaylist
        isOpen={isAddToPlaylistModelOpen}
        onClose={() => setIsAddToPlaylistModelOpen(false)}
        problemIds={selectedProblemId}
      />
    </div>
  );
};

export default ProblemTable;
