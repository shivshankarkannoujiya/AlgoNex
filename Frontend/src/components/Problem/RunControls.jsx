import { Play, CloudUploadIcon } from "lucide-react";

const RunControls = ({ handleRunCode, isExecuting }) => {
  return (
    <div className="p-4 border-t-2 border-white">
      <div className="flex items-center justify-between">
        <button
          onClick={handleRunCode}
          disabled={isExecuting}
          className="px-4 py-3 flex items-center justify-center gap-2 border rounded-md font-semibold cursor-pointer"
        >
          <Play className="w-4 h-4" />
          {isExecuting ? "Running..." : "Run Code"}
        </button>

        <button className="px-4 py-3 flex items-center justify-center gap-2 border rounded-md text-teal-500 font-semibold cursor-pointer">
          <CloudUploadIcon className="w-4 h-4 text-teal-500" />
          Submit Code
        </button>
      </div>
    </div>
  );
};

export default RunControls;
