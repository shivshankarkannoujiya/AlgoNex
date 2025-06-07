import { Link } from "react-router-dom";
import {
  Bookmark,
  ChevronRight,
  Clock,
  Home,
  Share2,
  ThumbsUp,
  Users,
} from "lucide-react";

const ProblemHeader = ({
  problem,
  submissionCount,
  successRate,
  isBookmarked,
  setIsBookmarked,
  selectedLanguage,
  handleLanguageChange,
}) => {
  return (
    <nav className="w-full bg-[#000814] px-4 py-4 text-white shadow-lg">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center text-teal-500 gap-2 text-sm">
            <Link
              to="/dashboard"
              className="hover:text-teal-400 transition-colors"
            >
              <Home className="w-5 h-5" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-bold">
              {problem?.title || "Problem"}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300 mt-1">
            <span className="inline-flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {problem?.createdAt
                ? new Date(problem.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "Unknown"}
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="w-4 h-4" />
              {submissionCount} Submissions
            </span>
            <span className="inline-flex items-center gap-1">
              <ThumbsUp className="w-4 h-4" />
              {successRate}% Success
            </span>
          </div>
        </div>

        {/* Right: Bookmark, Share, Language Selector */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-full transition hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              isBookmarked ? "text-teal-400" : "text-gray-400"
            }`}
            aria-label="Toggle Bookmark"
          >
            <Bookmark className="w-5 h-5" />
          </button>

          <button
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Share Problem"
          >
            <Share2 className="w-5 h-5" />
          </button>

          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="px-3 py-2 border border-gray-600 bg-gray-950 text-sm text-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          >
            {Object.keys(problem?.codeSnippets || {}).map((lang) => (
              <option key={lang} value={lang.toLowerCase()}>
                {lang.charAt(0) + lang.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
};

export default ProblemHeader;
