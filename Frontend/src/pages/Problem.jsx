import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getProblemById } from "../features/problem/problemThunks";

import { executeCode, runCode } from "../features/execution/executionThunks";
import { getJudge0LanguageId } from "../Service/lang.js";
import {
  getSubmissionCountForProblem,
  getSubmissionForProblem,
} from "../features/submission/submissionThunks.js";
import { clearExecutionSubmission } from "../features/execution/executionSlice.js";
import {
  TabBar,
  ProblemHeader,
  ProblemDiscussion,
  ProblemSubmissions,
  ProblemDescription,
  ProblemHints,
  RunControls,
  TestCaseTable,
  CodeEditorPanel,
} from "../components/index.js";

const Problem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { problem } = useSelector((state) => state.problems);
  const { submission, isExecuting, results, isRunning } = useSelector(
    (state) => state.execution,
  );
  const {
    submissionCount,
    submission: submissionForProblem,
    isLoading: isSubmissionLoading,
  } = useSelector((state) => state.submission);

  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [testcases, setTestCases] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [customTestCases, setCustomTestCases] = useState([
    { input: "", output: "" },
  ]);
  const [activeTestIndex, setActiveTestIndex] = useState(0);

  useEffect(() => {
    dispatch(getProblemById(id));
    dispatch(getSubmissionCountForProblem(id));
    dispatch(getSubmissionForProblem(id));
    dispatch(clearExecutionSubmission());
  }, [id, dispatch]);

  const successfulSubmissions =
    submissionForProblem?.filter((s) => s?.status.toLowerCase() === "accepted")
      ?.length || 0;
  const totalSubmissions = submissionForProblem?.length || 0;
  const successRate =
    totalSubmissions > 0
      ? Math.round((successfulSubmissions / totalSubmissions) * 100)
      : 0;

  useEffect(() => {
    if (activeTab === "submission") {
      dispatch(getSubmissionForProblem());
    }
  }, [dispatch]);


  useEffect(() => {
    if (problem) {
      setCode(problem.codeSnippets?.[selectedLanguage.toUpperCase()] || "");
      setTestCases(
        problem?.testcases.map((tc) => ({
          input: tc.input,
          output: tc.output,
        })) || [],
      );
    }
  }, [problem, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    setSelectedLanguage(language);
    setCode(problem.codeSnippets?.[language.toUpperCase()] || "");
  };

  const handleAddCustomTestCase = () => {
    setCustomTestCases((prev) => [...prev, { input: "", output: "" }]);
    setActiveTestIndex(customTestCases.length);
  };

  const handleDeleteCustomTestCase = (index) => {
    const updated = [...customTestCases];
    updated.splice(index, 1);
    setCustomTestCases(updated.length ? updated : [{ input: "", output: "" }]);
    setActiveTestIndex((prev) => (prev === index ? 0 : Math.max(0, prev - 1)));
  };

  const handleChangeCustomTestCase = (index, field, value) => {
    const updated = [...customTestCases];
    updated[index][field] = value;
    setCustomTestCases(updated);
  };

  const handleExecuteCode = async (e) => {
    e.preventDefault();
    try {
      const language_id = getJudge0LanguageId(selectedLanguage);
      const useCustom = customTestCases.some((tc) => tc.input.trim() !== "");

      const stdin = useCustom
        ? customTestCases.map((tc) => tc.input)
        : problem.testcases?.map((tc) => tc.input);

      const expected_outputs = useCustom
        ? customTestCases.map((tc) => tc.output)
        : problem.testcases?.map((tc) => tc.output);

      await dispatch(
        executeCode({
          source_code: code,
          language_id,
          stdin,
          expected_outputs,
          problemId: id,
        }),
      );

      toast.success("Executed Successfully!");
    } catch (error) {
      console.error("Error Executing Code: ", error);
      toast.error("Execution Failed");
    }
  };

  const handleRunCode = async (e) => {
    e.preventDefault();
    try {
      const language_id = getJudge0LanguageId(selectedLanguage);
      const useCustom = customTestCases.some((tc) => tc.input.trim() !== "");

      const stdin = useCustom
        ? customTestCases.map((tc) => tc.input)
        : problem.testcases?.map((tc) => tc.input);

      const expected_outputs = useCustom
        ? customTestCases.map((tc) => tc.output)
        : problem.testcases?.map((tc) => tc.output);

      await dispatch(
        runCode({
          source_code: code,
          language_id,
          stdin,
          expected_outputs,
          problemId: id,
        }),
      ).unwrap();
      toast.success("Passes all Testcases!");
    } catch (error) {
      console.error("Error Running Code: ", error);
      toast.error("Running Failed");
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return <ProblemDescription problem={problem} />;
      case "submissions":
        return (
          <ProblemSubmissions
            submissionForProblem={submissionForProblem}
            isSubmissionLoading={isSubmissionLoading}
          />
        );
      case "discussion":
        return <ProblemDiscussion problemId={problem.id} />;
      case "hints":
        return <ProblemHints hints={problem?.hints} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen px-4 bg-[#000814] home-gradient text-white">
      <ProblemHeader
        problem={problem}
        submissionCount={submissionCount}
        successRate={successRate}
        isBookmarked={isBookmarked}
        setIsBookmarked={setIsBookmarked}
        selectedLanguage={selectedLanguage}
        handleLanguageChange={handleLanguageChange}
      />

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-950 rounded-xl shadow-xl overflow-hidden">
            <div className="p-0">
              <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
              <div className="p-6">{renderTabContent()}</div>
            </div>
          </div>

          <div>
            <CodeEditorPanel
              code={code}
              setCode={setCode}
              selectedLanguage={selectedLanguage}
              customTestCases={customTestCases}
              activeTestIndex={activeTestIndex}
              setActiveTestIndex={setActiveTestIndex}
              handleAddCustomTestCase={handleAddCustomTestCase}
              handleDeleteCustomTestCase={handleDeleteCustomTestCase}
              handleChangeCustomTestCase={handleChangeCustomTestCase}
            />
            <RunControls
              handleExecuteCode={handleExecuteCode}
              handleRunCode={handleRunCode}
              isExecuting={isExecuting}
              isRunning={isRunning}
            />
          </div>
        </div>
      </div>

      <TestCaseTable submission={submission} testcases={testcases} />
    </div>
  );
};

export default Problem;
