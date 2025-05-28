import {
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick as Memory,
} from "lucide-react";

const SubmissionResults = ({ submission }) => {
  const memoryArr = JSON.parse(submission?.memory || "[]");
  const timeArr = JSON.parse(submission?.time || "[]");

  const avgMemory =
    memoryArr.reduce((a, b) => a + parseFloat(b), 0) / memoryArr.length;
  const avgTime =
    timeArr.reduce((a, b) => a + parseFloat(b), 0) / timeArr.length;

  const passedTests = submission?.testCases.filter((tc) => tc.passed).length;
  const totalTests = submission?.testCases.length;
  const successRate = (passedTests / totalTests) * 100;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            title: "Status",
            value: submission?.status,
            color: submission?.status === "ACCEPTED" ? "text-teal-500" : "text-red-600",
          },
          {
            title: "Success Rate",
            value: `${successRate.toFixed(1)}%`,
            barValue: successRate,
          },
          {
            title: "Avg. Runtime",
            value: `${avgTime.toFixed(3)} s`,
            barValue: (avgTime / 5) * 100, 
            icon: <Clock className="w-4 h-4" />,
          },
          {
            title: "Avg. Memory",
            value: `${avgMemory.toFixed(0)} KB`,
            barValue: (avgMemory / 100000) * 100, 
            icon: <Memory className="w-4 h-4" />,
          },
        ].map((stat, idx) => (
          <div key={idx} className="rounded-2xl bg-[#0B1120] dark:bg-gray-900 p-4 shadow-lg">
            <h3 className="text-sm font-semibold text-gray-100 dark:text-gray-200 flex items-center gap-2">
              {stat.icon}
              {stat.title}
            </h3>
            <div className={`text-lg font-bold ${stat.color || ""}`}>
              {stat.value}
            </div>
            {stat.barValue !== undefined && (
              <div className="mt-2 w-full bg-gray-700/30 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-teal-400 to-cyan-600 transition-all"
                  style={{ width: `${Math.min(stat.barValue, 100)}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-[#0B1120] dark:bg-gray-900 p-6 shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-white dark:text-gray-100">
          Test Cases Results
        </h2>
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-600">
            <thead>
              <tr>
                {["Status", "Expected Output", "Your Output", "Memory", "Time"].map((head) => (
                  <th
                    key={head}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {submission?.testCases.map((testCase, index) => (
                <tr key={testCase.id} className={index % 2 === 0 ? "" : "bg-gray-800/20"}>
                  <td className="px-6 py-4">
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
                  <td className="px-6 py-4 text-sm font-mono text-gray-100">{testCase.expected}</td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-100">{testCase.stdout || "null"}</td>
                  <td className="px-6 py-4 text-sm text-gray-100">{testCase.memory}</td>
                  <td className="px-6 py-4 text-sm text-gray-100">{testCase.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {submission?.testCases.map((tc, idx) => (
            <div
              key={tc.id}
              className="p-4 bg-gray-800/40 rounded-xl border border-gray-600 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-gray-300">Status:</span>
                <span
                  className={`flex items-center gap-1 ${
                    tc.passed ? "text-teal-500" : "text-red-600"
                  }`}
                >
                  {tc.passed ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  {tc.passed ? "Passed" : "Failed"}
                </span>
              </div>
              <div className="text-xs text-gray-400 font-mono">
                <div>
                  <span className="text-gray-300">Expected: </span>
                  {tc.expected}
                </div>
                <div>
                  <span className="text-gray-300">Output: </span>
                  {tc.stdout || "null"}
                </div>
                <div>
                  <span className="text-gray-300">Memory: </span>
                  {tc.memory}
                </div>
                <div>
                  <span className="text-gray-300">Time: </span>
                  {tc.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubmissionResults;
