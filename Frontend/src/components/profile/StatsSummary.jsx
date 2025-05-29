import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import apiClient from "../../Service/apiClient";

const StatsCard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await apiClient.getUserDashboardSummary();
        setSummary(res.data);
      } catch (err) {
        setError("Failed to fetch statistics.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#1e1e1e] p-6 rounded-xl shadow-lg text-white animate-pulse flex gap-8 justify-between items-center">
        <div className="w-[200px] h-[200px] bg-[#2a2a2a] rounded-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div className="h-20 bg-[#2a2a2a] rounded-md" />
          <div className="h-20 bg-[#2a2a2a] rounded-md" />
          <div className="h-20 bg-[#2a2a2a] rounded-md" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-400 p-4">{error}</div>;
  }

  const { totalSubmissions, acceptanceRate, problems } = summary;
  const chartData = [
    {
      name: "Easy",
      value: problems.easy?.solved || 0,
      color: "#00C49F",
    },
    {
      name: "Medium",
      value: problems.medium?.solved || 0,
      color: "#FFBB28",
    },
    {
      name: "Hard",
      value: problems.hard?.solved || 0,
      color: "#FF4C4C",
    },
  ];

  const totalSolved = chartData.reduce((acc, item) => acc + item.value, 0);
  const totalProblems =
    (problems.easy?.total || 0) +
    (problems.medium?.total || 0) +
    (problems.hard?.total || 0);

  return (
    <div className="bg-[#1e1e1e] text-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row justify-between gap-8 items-center">
      {/* Chart */}
      <div className="relative w-[200px] h-[200px]">
        <PieChart width={200} height={200}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
            onMouseEnter={(_, i) => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {hovered !== null ? (
            <>
              <p className="text-sm text-gray-400">{chartData[hovered].name}</p>
              <p className="text-3xl font-bold text-white">
                {chartData[hovered].value}
              </p>
            </>
          ) : (
            <>
              <p className="text-3xl font-bold">
                {totalSolved} / {totalProblems}
              </p>
              <p className="text-sm text-green-500">Solved</p>
            </>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full md:w-auto text-center">
        <div className="bg-[#2b2b2b] p-4 rounded-md">
          <p className="text-cyan-400 font-semibold">Easy</p>
          <p className="text-xl">
            {problems.easy?.solved || 0} / {problems.easy?.total || 0}
          </p>
        </div>
        <div className="bg-[#2b2b2b] p-4 rounded-md">
          <p className="text-yellow-400 font-semibold">Medium</p>
          <p className="text-xl">
            {problems.medium?.solved || 0} / {problems.medium?.total || 0}
          </p>
        </div>
        <div className="bg-[#2b2b2b] p-4 rounded-md">
          <p className="text-red-400 font-semibold">Hard</p>
          <p className="text-xl">
            {problems.hard?.solved || 0} / {problems.hard?.total || 0}
          </p>
        </div>

        <div className="md:col-span-3 mt-2 text-sm text-gray-400">
          Total Submissions:{" "}
          <span className="text-white font-medium">{totalSubmissions}</span> •
          Acceptance:{" "}
          <span className="text-green-400 font-medium">{acceptanceRate}%</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
