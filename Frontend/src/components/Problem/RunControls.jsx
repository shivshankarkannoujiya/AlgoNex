import { Play, CloudUploadIcon } from "lucide-react";

const RunControls = ({
  handleExecuteCode,
  isExecuting,
  handleRunCode,
  isRunning,
}) => {
  return (
    <div className="p-4 border-t-2 border-white">
      <div className="flex items-center justify-between">
        <button
          onClick={handleRunCode}
          disabled={isRunning}
          className="px-4 py-3 flex items-center justify-center gap-2 border rounded-md font-semibold cursor-pointer"
        >
          <Play className="w-4 h-4" />
          {isRunning ? "Running..." : "Run Code"}
        </button>

        <button
          onClick={handleExecuteCode}
          disabled={isExecuting}
          className="px-4 py-3 flex items-center justify-center gap-2 border rounded-md text-teal-500 font-semibold cursor-pointer"
        >
          <CloudUploadIcon className="w-4 h-4 text-teal-500" />
          {isExecuting ? "Submitting" : "Submit Code"}
        </button>
      </div>
    </div>
  );
};

export default RunControls;
