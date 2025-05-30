import { SubmissionResults } from "../index";

const TestCaseTable = ({ submission, testcases }) => {
  if (submission) {
    return (
      <div className="bg-gray-950 rounded-xl shadow-xl mt-6">
        <div className="p-6">
          <SubmissionResults submission={submission} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 rounded-xl shadow-xl mt-6">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-teal-400">Sample Test Cases</h3>
        </div>

        {testcases?.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-gray-800">
            <table className="min-w-full text-sm text-left text-gray-200">
              <thead className="bg-[#0B1120] text-gray-300 uppercase text-xs tracking-wide">
                <tr>
                  <th className="px-6 py-3">Input</th>
                  <th className="px-6 py-3">Expected Output</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {testcases.map((testCase, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-900 transition"
                  >
                    <td className="px-6 py-4 whitespace-pre-wrap font-mono text-sm text-white">
                      {testCase.input}
                    </td>
                    <td className="px-6 py-4 whitespace-pre-wrap font-mono text-sm text-white">
                      {testCase.output}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-6 text-sm">
            No test cases available.
          </div>
        )}
      </div>
    </div>
  );
};

export default TestCaseTable;
