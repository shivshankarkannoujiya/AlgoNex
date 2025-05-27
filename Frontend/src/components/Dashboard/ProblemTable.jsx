import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Bookmark,
  PencilIcon,
  TrashIcon,
  Plus,
  CheckCircle,
  CircleDashed,
} from "lucide-react";

const ProblemTable = ({ problems }) => {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const { user } = useSelector((state) => state.auth);
  console.log(user);

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
  }, [problems, allTags, search, difficulty, selectedTag]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const paginatedProblems = useMemo(() => {
    return filteredProblems.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    );
  }, [filteredProblems, currentPage]);

  const handleAddToPlaylist = (id) => {};
  const handleDelete = (id) => {};

  return (
    <div className="w-full px-4 py-8 bg-[#000814] home-gradient rounded-2xl shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl font-semibold text-white">Problems</h2>
        <button
          className="flex items-center gap-2 px-4 py-3 bg-teal-600 hover:bg-teal-700 transition duration-300 rounded-lg text-white font-medium shadow"
          onClick={() => {}}
        >
          <Plus className="w-4 h-4" />
          Create Playlist
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center bg-gray-800 border border-gray-700 px-4 py-2 rounded-md w-96">
          <input
            className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
            placeholder="Search by title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-xl w-full"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="ALL">All Difficulties</option>
          {difficulties.map((diff) => (
            <option key={diff} value={diff}>
              {diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
        <select
          className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-xl w-full"
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

      <div className="bg-gray-950 p-6 rounded-lg shadow-lg w-full overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-200 border-separate border-spacing-y-3">
          <thead className="text-xs uppercase text-gray-400 border-b border-gray-600">
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
                  (userItem) => userItem.userId === user?.id,
                );
                return (
                  <tr
                    key={problem.id}
                    className="bg-gray-900 hover:bg-gray-800 transition rounded-md"
                  >
                    <td className="px-4 py-3 align-middle text-center">
                      {isSolved ? (
                        <CheckCircle className="w-5 h-5 text-teal-500" />
                      ) : (
                        <CircleDashed className="w-5 h-5 text-gray-600" />
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-white-400  whitespace-nowrap">
                      <Link to={`/problem/${problem.id}`}>{problem.title}</Link>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {(problem.tags || []).map((tag, idx) => (
                          <span
                            key={idx}
                            className=" border border-yellow-500 text-yellow-500 text-xs font-semibold px-2 py-0.5 rounded-full"
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
                            ? "border border-teal-600 text-teal-600"
                            : problem.difficulty === "MEDIUM"
                              ? "border border-yellow-500 text-yellow-500 "
                              : "border border-red-600 text-red-600"
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                        {user?.role === "ADMIN" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDelete(problem.id)}
                              className="border-2 border-red-600 text-red-500 px-2 py-2 rounded-md flex items-center cursor-pointer"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                            <button
                              className="bg-gray-400 text-white px-2 py-1 rounded-md opacity-50 cursor-pointer flex items-center"
                            >
                              <PencilIcon className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                        <button
                          onClick={() => handleAddToPlaylist(problem.id)}
                          className="border border-gray-500 text-gray-300 hover:bg-gray-700 px-2 py-1 rounded-md flex items-center gap-1 cursor-pointer"
                        >
                          <Bookmark className="w-4 h-4" />
                          <span className="hidden sm:inline text-sm ">
                            Save to Playlist
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500 text-lg font-semibold"
                >
                  No problems found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        <button
          className={`px-3 py-2 text-sm rounded-md border border-gray-500 flex items-center justify-center 
                ${
                  currentPage === 1
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>

        <span className="px-3 py-2 text-sm rounded-md text-gray-300 bg-gray-700 border border-gray-500 ">
          {currentPage} / {totalPages}
        </span>

        <button
          className={`px-3 py-1 text-sm rounded-md border border-gray-500 
                ${
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
    </div>
  );
};

export default ProblemTable;
