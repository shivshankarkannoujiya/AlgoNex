const ProblemDescription = ({ problem }) => {
  if (!problem) return null;

  return (
    <div className="prose max-w-none">
      <p className="text-lg mb-6">{problem?.description}</p>

      {problem?.example && (
        <>
          <h3 className="text-xl text-teal-500 font-bold mb-4">Examples</h3>
          {Object.entries(problem.example).map(([lang, example]) => (
            <div
              key={lang}
              className="bg-[#0B1120] p-6 rounded-xl mb-6 font-mono text-white"
            >
              <div className="mb-4">
                <div className="text-[#7DD3FC] mb-2 text-base font-semibold">Input</div>
                <span className="bg-[#2C3440] px-4 py-2 rounded-lg font-semibold text-white w-full inline-block">
                  {example.input}
                </span>
              </div>
              <div className="mb-4">
                <div className="text-[#7DD3FC] mb-2 text-base font-semibold">Output:</div>
                <span className="bg-[#2C3440] px-4 py-2 rounded-lg font-semibold text-[#E5E7EB] inline-block w-full">
                  {example.output}
                </span>
              </div>
              {example.explanation && (
                <div>
                  <p className="text-lg text-[#E5E7EB] font-medium">{example.explanation}</p>
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {problem?.constraints && (
        <>
          <h3 className="text-xl text-teal-500 font-bold mb-4">Constraints</h3>
          <div className="bg-[#0B1120] p-6 rounded-xl mb-6">
            <span className="bg-[#2C3440] px-4 py-2 rounded-lg font-semibold text-white text-lg w-full inline-block">
              {problem.constraints}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default ProblemDescription;
