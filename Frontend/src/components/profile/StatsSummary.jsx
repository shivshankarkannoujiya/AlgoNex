import React from "react";

const StatsSummary = ({ stats }) => {
  if (!stats) return null;

  const { totalSolved, totalQuestions, easySolved, mediumSolved, hardSolved } =
    stats;

  const percentage = ((totalSolved / totalQuestions) * 100).toFixed(1);

  return (
    <div className="bg-zinc-900 text-white rounded-2xl p-6 w-full shadow-md flex flex-col items-center">
      {/* Circular Ring Indicator */}
      <div className="relative w-32 h-32 mb-4">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-zinc-700"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-green-400"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeDasharray={`${percentage}, 100`}
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-semibold">{totalSolved}</span>
          <span className="text-sm text-zinc-400">/ {totalQuestions}</span>
          <span className="text-sm text-green-400">Solved</span>
        </div>
      </div>

      {/* Attempting (Optional) */}
      {stats.attemptingCount > 0 && (
        <div className="text-sm text-zinc-400 mb-4">
          {stats.attemptingCount} Attempting
        </div>
      )}

      {/* Difficulty Breakdown */}
      <div className="w-full grid grid-cols-3 gap-4 text-center mt-2">
        <div>
          <p className="text-emerald-400 font-semibold">{easySolved}</p>
          <p className="text-xs text-zinc-400">Easy</p>
        </div>
        <div>
          <p className="text-yellow-400 font-semibold">{mediumSolved}</p>
          <p className="text-xs text-zinc-400">Med.</p>
        </div>
        <div>
          <p className="text-red-400 font-semibold">{hardSolved}</p>
          <p className="text-xs text-zinc-400">Hard</p>
        </div>
      </div>
    </div>
  );
};

export default StatsSummary;
