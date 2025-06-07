import Editor from "@monaco-editor/react";
import { Terminal } from "lucide-react";

const CodeEditorPanel = ({
  code,
  setCode,
  selectedLanguage,
  customTestCases,
  activeTestIndex,
  setActiveTestIndex,
  handleAddCustomTestCase,
  handleDeleteCustomTestCase,
  handleChangeCustomTestCase,
}) => {
  const activeCase = customTestCases[activeTestIndex];

  return (
    <div className="bg-gray-950 rounded-xl shadow-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800 text-sm font-medium text-gray-300 bg-gray-950">
        <Terminal className="w-4 h-4 text-teal-400" />
        Code Editor
      </div>

      <div className="h-[600px] w-full">
        <Editor
          height="100%"
          language={selectedLanguage.toLowerCase()}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 16,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            readOnly: false,
            automaticLayout: true,
            wordWrap: "on",
            tabSize: 2,
            guides: { bracketPairs: true },
            quickSuggestions: true,
            autoClosingBrackets: "always",
            autoClosingQuotes: "always",
            autoSurround: "languageDefined",
            codeLens: true,
            scrollbar: {
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
            },
          }}
        />
      </div>

      <div className="p-4 border-t border-gray-800">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {customTestCases.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTestIndex(index)}
              className={`px-3 py-1 rounded-md text-sm font-semibold transition ${
                activeTestIndex === index
                  ? "bg-gray-800 text-teal-400"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Case {index + 1}
            </button>
          ))}
          <button
            onClick={handleAddCustomTestCase}
            className="px-3 py-1 text-sm font-semibold rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 transition"
            title="Add new test case"
          >
            +
          </button>
        </div>

        {activeCase && (
          <div className="bg-[#0B1120] p-4 rounded-lg relative space-y-4 text-sm text-gray-200">
            {customTestCases.length > 1 && (
              <button
                onClick={() => handleDeleteCustomTestCase(activeTestIndex)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-400 text-base font-bold"
                title="Delete this test case"
              >
                ×
              </button>
            )}

            <div>
              <label className="block text-gray-400 mb-1">Input</label>
              <input
                type="text"
                value={activeCase.input}
                onChange={(e) =>
                  handleChangeCustomTestCase(
                    activeTestIndex,
                    "input",
                    e.target.value
                  )
                }
                placeholder="Enter input value..."
                className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Expected Output</label>
              <input
                type="text"
                value={activeCase.output}
                onChange={(e) =>
                  handleChangeCustomTestCase(
                    activeTestIndex,
                    "output",
                    e.target.value
                  )
                }
                placeholder="Enter expected output..."
                className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditorPanel;
