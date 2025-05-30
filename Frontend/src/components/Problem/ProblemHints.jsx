const ProblemHints = ({ hints }) => {
  return (
    <div className="text-gray-200">
      {hints ? (
        <div className="bg-[#0B1120] p-5 rounded-lg text-sm">
          <h3 className="text-lg font-semibold text-teal-400 mb-2">Hint</h3>
          <p className="text-gray-300">{hints}</p>
        </div>
      ) : (
        <div className="text-center text-gray-400">No hints available</div>
      )}
    </div>
  );
};

export default ProblemHints;
