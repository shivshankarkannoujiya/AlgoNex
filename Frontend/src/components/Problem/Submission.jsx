import {
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick as Memory,
} from "lucide-react";

const SubmissionResults = ({ submission }) => {
  // Parse stringified arrays
  const memoryArr = JSON.parse(submission?.memory || "[]");
  const timeArr = JSON.parse(submission?.time || "[]");

  // Calculate averages
  const avgMemory =
    memoryArr
      .map((m) => parseFloat(m)) // remove ' KB' using parseFloat
      .reduce((a, b) => a + b, 0) / memoryArr.length;

  const avgTime =
    timeArr
      .map((t) => parseFloat(t)) // remove ' s' using parseFloat
      .reduce((a, b) => a + b, 0) / timeArr.length;

  const passedTests = submission?.testCases.filter((tc) => tc.passed).length;
  const totalTests = submission?.testCases.length;
  const successRate = (passedTests / totalTests) * 100;

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-[#0B1120] p-4 shadow-lg">
          <h3 className="text-sm font-semibold text-gray-100">Status</h3>
          <div
            className={`text-lg font-bold ${
              submission?.status === "ACCEPTED"
                ? "text-teal-500"
                : "text-red-600"
            }`}
          >
            {submission?.status}
          </div>
        </div>

        <div className="rounded-2xl bg-[#0B1120] p-4 shadow-lg">
          <h3 className="text-sm font-semibold text-gray-100">Success Rate</h3>
          <div className="text-lg font-bold">{successRate.toFixed(1)}%</div>
        </div>

        <div className="rounded-2xl bg-[#0B1120] p-4 shadow-lg">
          <h3 className="text-sm font-semibold text-gray-100 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Avg. Runtime
          </h3>
          <div className="text-lg font-bold">{avgTime.toFixed(3)} s</div>
        </div>

        <div className="rounded-2xl bg-[#0B1120] p-4 shadow-lg">
          <h3 className="text-sm font-semibold text-gray-100 flex items-center gap-2">
            <Memory className="w-4 h-4" />
            Avg. Memory
          </h3>
          <div className="text-lg font-bold">{avgMemory.toFixed(0)} KB</div>
        </div>
      </div>

      {/* Test Cases Results */}
      <div className="rounded-2xl bg-[#0B1120] p-6 shadow-xl">
        <h2 className="text-xl font-bold mb-4">Test Cases Results</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#0B1120]">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
                >
                  Expected Output
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
                >
                  Your Output
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
                >
                  Memory
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
                >
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#0B1120] divide-y divide-gray-200">
              {submission?.testCases.map((testCase, index) => (
                <tr
                  key={testCase.id}
                  className={index % 2 === 0 ? "bg-[#0B1120]" : "bg-[#1e242d]"}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {testCase.passed ? (
                      <div className="flex items-center gap-2 text-teal-500">
                        <CheckCircle2 className="w-5 h-5" />
                        Passed
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-red-600">
                        <XCircle className="w-5 h-5" />
                        Failed
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-100">
                    {testCase.expected}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-100">
                    {testCase.stdout || "null"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                    {testCase.memory}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                    {testCase.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubmissionResults