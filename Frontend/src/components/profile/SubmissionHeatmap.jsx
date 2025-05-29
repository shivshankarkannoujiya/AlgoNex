import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { subDays, format, addDays } from "date-fns"; // Added addDays for chart data generation
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import apiClient from "../../Service/apiClient";
import "./HeatmapDark.css";

const today = new Date();

const SubmissionHeatmap = ({ userId }) => {
  const [values, setValues] = useState([]);
  const [totalLast30Days, setTotalLast30Days] = useState(0);
  const [dailyChartData, setDailyChartData] = useState([]); // Changed from weeklyData
  const [streak, setStreak] = useState({ current: 0, longest: 0 });

  useEffect(() => {
    if (!userId) return;

    const fetchHeatmap = async () => {
      try {
        const res = await apiClient.getSubmissionHeatMap();
        const data = res.data.heatmapData;

        const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setValues(sortedData);

        const last30DaysAgo = subDays(today, 30);
        const last30 = sortedData.filter((d) => {
          const date = new Date(d.date);
          return date >= last30DaysAgo;
        });
        setTotalLast30Days(last30.reduce((sum, d) => sum + d.count, 0));

        const CHART_DAYS_COUNT = 60; 
        const chartDataMap = new Map(sortedData.map(d => [d.date, d.count]));
        const newDailyChartData = [];

        for (let i = CHART_DAYS_COUNT - 1; i >= 0; i--) {
          const date = subDays(today, i);
          const formattedDate = format(date, 'MMM dd');
          const dateKey = format(date, 'yyyy-MM-dd');
          const count = chartDataMap.get(dateKey) || 0;
          newDailyChartData.push({ date: formattedDate, count: count });
        }
        setDailyChartData(newDailyChartData);

        let current = 0;
        let longest = 0;
        let tempCurrentStreak = 0;
        const submissionMap = new Map(sortedData.map(d => [d.date, d.count]));

        for (let i = 0; i <= 365; i++) {
          const dateToCheck = format(subDays(today, i), "yyyy-MM-dd");
          const count = submissionMap.get(dateToCheck) || 0;

          if (count > 0) {
            tempCurrentStreak++;
            if (i === 0) {
                current = tempCurrentStreak;
            }
          } else {
            if (i === 0 && count === 0) {
                current = 0;
            }
            longest = Math.max(longest, tempCurrentStreak);
            tempCurrentStreak = 0;
          }
        }
        longest = Math.max(longest, tempCurrentStreak);

        setStreak({ current, longest });

      } catch (err) {
        console.error("Error loading submission heatmap", err);
      }
    };

    fetchHeatmap();
  }, [userId]);

  return (
    <div className="p-6 rounded-2xl shadow-lg w-full max-w-7xl mx-auto overflow-hidden" style={{ backgroundColor: "#141414" }}>
      <h2 className="text-white font-extrabold text-2xl mb-4 pb-2 inline-block">
        Activity Grid
      </h2>

      <CalendarHeatmap
        startDate={subDays(today, 364)}
        endDate={today}
        values={values}
        classForValue={(value) => {
          if (!value || value.count === 0) return "color-empty";
          if (value.count >= 10) return "color-heat-5";
          if (value.count >= 7) return "color-heat-4";
          if (value.count >= 4) return "color-heat-3";
          if (value.count >= 1) return "color-heat-2";
          return "color-heat-1";
        }}
        tooltipDataAttrs={(value) => {
          if (!value || !value.date) {
            return {};
          }
          const formattedDate = new Date(value.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
          return {
            "data-tooltip-id": "submission-tooltip",
            "data-tooltip-content": `${value.count || 0} submission${
              value.count === 1 ? "" : "s"
            } on ${formattedDate}`,
          };
        }}
        showWeekdayLabels={true}
      />
      <ReactTooltip
        id="submission-tooltip"
        className="!z-50 !bg-[#222222] !text-[#00E5FF] !rounded-md !px-3 !py-1 !text-sm shadow-xl border border-[#00E5FF55]"
      />

      <div className="mt-4 flex justify-end text-xs text-[#888888] items-center">
        <span className="mr-2">Less</span>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 border border-[#333333] rounded-sm bg-[#1a1a1a]"></div>
          <div className="w-3 h-3 bg-[#005c5c] rounded-sm"></div>
          <div className="w-3 h-3 bg-[#008c8c] rounded-sm"></div>
          <div className="w-3 h-3 bg-[#00baba] rounded-sm"></div>
          <div className="w-3 h-3 bg-[#00e5ff] rounded-sm"></div>
        </div>
        <span className="ml-2">More</span>
      </div>

      <div className="mt-8 border-t border-[#333333] pt-6">
        <h3 className="text-white mb-3 font-semibold text-xl">
          Daily Submission Trends (Last {60} Days)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={dailyChartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333333" strokeOpacity={0.5} />
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={11} 
              tickLine={false}
              axisLine={false}
              angle={-45} 
              textAnchor="end" 
              height={50} 
              interval={Math.floor(dailyChartData.length / 7)} 
            />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <RechartsTooltip
              cursor={{ stroke: '#00E5FF', strokeWidth: 1, strokeDasharray: '5 5' }}
              contentStyle={{
                backgroundColor: "#2a2a2a",
                borderColor: "#00E5FF",
                color: "#fff",
                borderRadius: "8px",
                boxShadow: "0 0 15px rgba(0, 229, 255, 0.3)",
              }}
              labelStyle={{ color: '#00E5FF', fontWeight: 'bold' }}
              itemStyle={{ color: '#fff' }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#00E5FF"
              strokeWidth={3}
              dot={{ fill: "#00E5FF", stroke: "#00E5FF", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 7, strokeWidth: 3, fill: '#fff', stroke: '#00E5FF' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="text-sm text-[#AAAAAA] mt-8 flex flex-col md:flex-row justify-around items-center bg-[#222222] p-4 rounded-lg border border-[#333333]">
        <p className="flex items-center mb-2 md:mb-0">
          <span className="text-2xl mr-2">🔥</span>{" "}
          <span className="text-white font-extrabold text-xl">{streak.current}</span>{" "}
          <span className="ml-1">day current streak</span>
        </p>
        <p className="flex items-center mb-2 md:mb-0">
          <span className="text-2xl mr-2">🏆</span>{" "}
          <span className="text-white font-extrabold text-xl">{streak.longest}</span>{" "}
          <span className="ml-1">day longest streak</span>
        </p>
        <p className="flex items-center">
          <span className="text-2xl mr-2">📅</span>{" "}
          <span className="text-white font-extrabold text-xl">{totalLast30Days}</span>{" "}
          <span className="ml-1">submissions in last 30 days</span>
        </p>
      </div>
    </div>
  );
};

export default SubmissionHeatmap;