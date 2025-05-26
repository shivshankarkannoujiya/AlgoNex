import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { useSelector, useDispatch } from "react-redux";
import { getProblemById } from "../features/problem/problemThunks";
import {
  Play,
  FileText,
  MessageSquare,
  Lightbulb,
  Bookmark,
  Share2,
  Clock,
  ChevronRight,
  BookOpen,
  Terminal,
  Code2,
  Users,
  ThumbsUp,
  Home,
  CloudUploadIcon,
} from "lucide-react";

const Problem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isProblemLoading, problem } = useSelector((state) => state.problems);

  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [testcases, setTestCases] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    dispatch(getProblemById(id));
  }, [id, dispatch]);

  console.log(problem);

  useEffect(() => {
    if (problem) {
      setCode(problem.codeSnippets?.[selectedLanguage] || "");
      setTestCases(
        problem?.testcases.map((tc) => ({
          input: tc.input,
          output: tc.output,
        })) || [],
      );
    }
  }, [problem, selectedLanguage]);
  console.log("TESTCASES: ", testcases);

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    setSelectedLanguage(language);
    setCode(problem.codeSnippets?.[language] || "");
  };

  let submissionCount = 12;
  const submission = false;

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="prose max-w-none">
            <p className="text-lg mb-6">{problem?.description}</p>

            {problem?.example && (
              <>
                <h3 className="text-xl text-teal-500 font-bold mb-4">
                  Examples
                </h3>
                {Object.entries(problem.example).map(([lang, example], idx) => (
                  <div
                    key={lang}
                    className="bg-[#0B1120] p-6 rounded-xl mb-6 font-mono text-white"
                  >
                    <div className="mb-4">
                      <div className="text-[#7DD3FC] mb-2 text-base font-semibold">
                        {" "}
                        Input
                      </div>
                      <span className="bg-[#2C3440] px-4 py-2 rounded-lg font-semibold text-white w-full inline-block">
                        {example.input}
                      </span>
                    </div>
                    <div className="mb-4">
                      <div className="text-[#7DD3FC] mb-2 text-base font-semibold">
                        {" "}
                        Output:
                      </div>
                      <span className="bg-[#2C3440] px-4 py-2 rounded-lg font-semibold text-[#E5E7EB] inline-block w-full">
                        {example.output}
                      </span>
                    </div>
                    {example.explanation && (
                      <div>
                        <div className="text-emerald-600 mb-2 text-base font-semibold">
                          {" "}
                        </div>
                        <p className="text-lg text-[#E5E7EB] font-medium">
                          {" "}
                          {example.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

            {problem?.constraints && (
              <>
                <h3 className="text-xl text-teal-500 font-bold mb-4">
                  Constraints
                </h3>
                <div className="bg-[#0B1120] p-6 rounded-xl mb-6">
                  {" "}
                  <span className="bg-[#2C3440] px-4 py-2 rounded-lg font-semibold text-white text-lg w-full inline-block">
                    {problem.constraints}
                  </span>
                </div>
              </>
            )}
          </div>
        );
      case "submissions":
        return (
          <div className="p-4 text-center text-gray-600">
            {" "}
            {/* Replaced text-base-content/70 */}
            No discussions yet
          </div>
        );
      case "discussion":
        return (
          <div className="p-4 text-center text-gray-600">
            {" "}
            {/* Replaced text-base-content/70 */}
            No discussions yet
          </div>
        );
      case "hints":
        return (
          <div className="p-4">
            {problem?.hints ? (
              <div className="bg-gray-100 p-6 rounded-xl">
                {" "}
                <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-lg">
                  {problem.hints}
                </span>
              </div>
            ) : (
              <div className="text-center text-gray-600">
                {" "}
                {/* Replaced text-base-content/70 */}
                No hints available
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen  px-4 bg-[#000814] home-gradient text-white">
      <nav className="flex items-center justify-between bg-[#0A1128] shadow-lg px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <Link
            to={"/dashboard"}
            className="flex items-center justify-center gap-2 text-teal-500 hover:text-teal-600"
          >
            <Home className="w-6 h-6" />
            <ChevronRight className="w-4 h-4" />
          </Link>
          <div className="ml-2">
            <h1 className="text-xl font-bold text-white">{problem?.title}</h1>
            <div className="flex items-center gap-2 text-sm text-white mt-1">
              <Clock className="w-4 h-4" />
              <span>
                Updated{" "}
                {new Date(problem?.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="text-gray-400">•</span>
              <Users className="w-4 h-4" />
              <span>{submissionCount} Submissions</span>
              <span className="text-gray-400">•</span>
              <ThumbsUp className="w-4 h-4" />
              <span>95% Success Rate</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            className={`p-2 rounded-full hover:bg-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
              isBookmarked ? "text-teal-600" : "text-gray-500"
            }`}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            <Share2 className="w-5 h-5" />
          </button>
          <select
            className="block w-40 px-3 py-2 border border-black bg-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            {Object.keys(problem?.codeSnippets || {}).map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-950 rounded-xl shadow-xl overflow-hidden">
            {" "}
            {/* Replaced card, bg-base-100, shadow-xl */}
            <div className="p-0">
              {" "}
              {/* Replaced card-body p-0 */}
              {/* Tabs */}
              <div className="flex border-b border-gray-200 ">
                {" "}
                {/* Replaced tabs tabs-bordered */}
                <button
                  className={`flex-1 py-3 px-4 text-center text-gray-100 font-medium border-b-2 border-transparent hover:border-blue-500 hover:text-blue-500 transition-colors duration-200 ${
                    activeTab === "description"
                      ? "border-blue-500 text-blue-500"
                      : ""
                  } flex items-center justify-center gap-2`}
                  onClick={() => setActiveTab("description")}
                >
                  <FileText className="w-4 h-4" />
                  Description
                </button>
                <button
                  className={`flex-1 py-3 px-4 text-center text-gray-100 font-medium border-b-2 border-transparent hover:border-blue-500 hover:text-blue-500 transition-colors duration-200 ${
                    activeTab === "submissions"
                      ? "border-blue-500 text-blue-500"
                      : ""
                  } flex items-center justify-center gap-2`}
                  onClick={() => setActiveTab("submissions")}
                >
                  <Code2 className="w-4 h-4" />
                  Submissions
                </button>
                <button
                  className={`flex-1 py-3 px-4 text-center text-gray-100 font-medium border-b-2 border-transparent hover:border-blue-500 hover:text-blue-500 transition-colors duration-200 ${
                    activeTab === "discussion"
                      ? "border-blue-500 text-blue-500"
                      : ""
                  } flex items-center justify-center gap-2`}
                  onClick={() => setActiveTab("discussion")}
                >
                  <MessageSquare className="w-4 h-4" />
                  Discussion
                </button>
                <button
                  className={`flex-1 py-3 px-4 text-center text-gray-100 font-medium border-b-2 border-transparent hover:border-blue-500 hover:text-blue-500 transition-colors duration-200 ${
                    activeTab === "hints" ? "border-blue-500 text-blue-500" : ""
                  } flex items-center justify-center gap-2`}
                  onClick={() => setActiveTab("hints")}
                >
                  <Lightbulb className="w-4 h-4" />
                  Hints
                </button>
              </div>
              <div className="p-6">{renderTabContent()}</div>
            </div>
          </div>

          <div className="bg-gray-950 rounded-xl shadow-xl overflow-hidden">
            <div className="p-0">
              {" "}
              <div className="flex border-b border-gray-700">
                {" "}
                <button className="flex items-center gap-2 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200">
                  <Terminal className="w-4 h-4" />
                  Code Editor
                </button>
              </div>
              <div className="h-[600px] w-full">
                <Editor
                  height={"100%"}
                  language={selectedLanguage.toLowerCase()}
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 18,
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    automaticLayout: true,
                    pasteAs: {
                      lineNumbers: false,
                      indentation: "auto",
                    },
                    cursorStyle: "line",
                    cursorBlinking: "blink",
                    smoothScrolling: true,
                    tabSize: 2,
                    renderWhitespace: "all",
                    wordWrap: "on",
                    quickSuggestions: true,
                    quickSuggestionsDelay: 100,
                    suggestIcons: true,
                    autoClosingBrackets: "always",
                    autoClosingQuotes: "always",
                    autoSurround: "languageDefined",
                    autoIndent: "full",
                    codeLens: true,
                    scrollbar: {
                      vertical: "auto",
                      horizontal: "auto",
                      verticalScrollbarSize: 8,
                      horizontalScrollbarSize: 8,
                      arrowSize: 30,
                    },
                    guides: {
                      bracketPairs: true,
                    },
                  }}
                />
              </div>
              <div className="p-4 border-t-2 border-white">
                <div className="flex items-center justify-between">
                  <button className="px-4 py-3  flex items-center justify-center gap-2 border rounded-md font-semibold cursor-pointer">
                    <Play className="w-4 h-4 " />
                    Run Code
                  </button>
                  <button className="px-4 py-3 flex items-center justify-center gap-2 border rounded-md text-teal-500 font-semibold cursor-pointer">
                    <CloudUploadIcon className="w-4 h-4 text-teal-500" />
                    Submit Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-950 rounded-xl shadow-xl mt-6">
        <div className="p-6">
          {submission ? (
            <h1 className="text-xl font-bold text-gray-100">Submission Data</h1>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-teal-500">Test Cases</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border-collapse">
                  <thead className="bg-[#0A1128] text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-300 uppercase tracking-wider">
                        Input
                      </th>
                      <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-300 uppercase tracking-wider">
                        Expected Output
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#0A1128] divide-y divide-gray-200 text-white">
                    {testcases?.length > 0 ? (
                      testcases.map((testCase, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 1 ? "bg-gray-700" : "bg-gray-800"
                          }
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-xl font-mono text-gray-100 font-semibold">
                            {testCase?.input}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-xl font-mono text-gray-100 font-semibold">
                            {testCase?.output}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={2}
                          className="text-center text-gray-400 py-4"
                        >
                          No test cases available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Problem;
