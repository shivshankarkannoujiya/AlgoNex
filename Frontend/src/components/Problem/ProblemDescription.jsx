const ProblemDescription = ({ problem }) => {
  if (!problem) return null;

  return (
    <div className="space-y-8 text-gray-200">
      <p className="text-lg leading-relaxed">{problem.description}</p>

      {problem.example && (
        <div>
          <h3 className="text-xl font-semibold text-teal-400 mb-3">Examples</h3>
          {Object.entries(problem.example).map(([lang, example]) => (
            <div
              key={lang}
              className="bg-[#0B1120] p-5 rounded-lg space-y-4 font-mono text-sm"
            >
              <div>
                <span className="block text-[#7DD3FC] font-semibold mb-1">
                  Input:
                </span>
                <div className="bg-[#2C3440] p-2 rounded">{example.input}</div>
              </div>
              <div>
                <span className="block text-[#7DD3FC] font-semibold mb-1">
                  Output:
                </span>
                <div className="bg-[#2C3440] p-2 rounded">{example.output}</div>
              </div>
              {example.explanation && (
                <div>
                  <span className="block text-emerald-400 font-semibold mb-1">
                    Explanation:
                  </span>
                  <div className="text-gray-300">{example.explanation}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {problem.constraints && (
        <div>
          <h3 className="text-xl font-semibold text-teal-400 mb-3">Constraints</h3>
          <div className="bg-[#0B1120] p-5 rounded-lg font-mono text-sm text-white">
            {problem.constraints}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemDescription;
