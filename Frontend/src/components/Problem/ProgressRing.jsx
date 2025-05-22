const ProgressRing = () => (
  <div className="flex items-center justify-center my-4">
    <div className="relative w-24 h-24">
      <svg className="w-full h-full transform -rotate-90">
        <circle cx="48" cy="48" r="40" stroke="#4B5563" strokeWidth="8" fill="none" />
        <circle cx="48" cy="48" r="40" stroke="#10B981" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="0" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-xs">
        <span className="text-lg font-bold">1/1</span>
        <span>Solved</span>
      </div>
    </div>
  </div>
);

export default ProgressRing