import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { subDays, format } from "date-fns";
import { Tooltip as ReactTooltip } from "react-tooltip";
import apiClient from "../../Service/apiClient";
import "react-calendar-heatmap/dist/styles.css";
import "./HeatmapDark.css";

const today = new Date();

const SubmissionHeatmap = ({ userId }) => {
  const [values, setValues] = useState([]);
  const [streak, setStreak] = useState({ current: 0, longest: 0 });

  useEffect(() => {
    if (!userId) return;

    const fetchHeatmap = async () => {
      try {
        const res = await apiClient.getSubmissionHeatMap();
        const data = res.data.heatmapData || [];

        const dateMap = new Map(data.map(d => [d.date, d.count]));
        const fullYearData = [];

        for (let i = 0; i <= 364; i++) {
          const date = format(subDays(today, i), "yyyy-MM-dd");
          fullYearData.push({
            date,
            count: dateMap.get(date) || 0,
          });
        }

        setValues(fullYearData.reverse());

        // Streaks
        let current = 0, longest = 0, temp = 0;
        for (let i = 0; i <= 364; i++) {
          const d = format(subDays(today, i), "yyyy-MM-dd");
          const count = dateMap.get(d) || 0;

          if (count > 0) {
            temp++;
            if (i === 0) current = temp;
          } else {
            if (i === 0) current = 0;
            longest = Math.max(longest, temp);
            temp = 0;
          }
        }
        longest = Math.max(longest, temp);
        setStreak({ current, longest });

      } catch (err) {
        console.error("Error fetching heatmap data:", err);
      }
    };

    fetchHeatmap();
  }, [userId]);

  return (
    <div className="bg-[#000814] border border-gray-700 home-gradient p-6 rounded-xl shadow-lg w-full max-w-7xl mx-auto">
      <h2 className="text-white text-xl font-bold mb-4 text-center">Submission Activity</h2>

      <div className="overflow-x-auto">
        <CalendarHeatmap
          startDate={subDays(today, 364)}
          endDate={today}
          values={values}
          showWeekdayLabels={true}
          classForValue={(val) => {
            if (!val || val.count === 0) return "color-empty";
            if (val.count >= 8) return "color-scale-4";
            if (val.count >= 5) return "color-scale-3";
            if (val.count >= 2) return "color-scale-2";
            return "color-scale-1";
          }}
          tooltipDataAttrs={(value) => ({
            "data-tooltip-id": "submission-tooltip",
            "data-tooltip-content": `${value.count} submission${value.count !== 1 ? "s" : ""} on ${format(new Date(value.date), "PP")}`,
          })}
        />
      </div>

      <ReactTooltip
        id="submission-tooltip"
        className="!z-50 !bg-[#161b22] !text-white !text-sm !border border-[#30363d] !px-3 !py-1 !rounded shadow-md"
      />

      <div className="mt-4 flex items-center justify-center text-sm text-gray-400 gap-2">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-[#0A1128] rounded-sm border border-[#1c1c1c]"></div>
          <div className="w-3 h-3 bg-[#0e4429] rounded-sm"></div>
          <div className="w-3 h-3 bg-[#006d32] rounded-sm"></div>
          <div className="w-3 h-3 bg-[#26a641] rounded-sm"></div>
          <div className="w-3 h-3 bg-[#39d353] rounded-sm"></div>
        </div>
        <span>More</span>
      </div>

      <div className="mt-4 flex flex-col md:flex-row justify-center items-center gap-6 text-sm text-gray-400 text-center">
        <div>
          🔥 Current streak:  <span className="text-white font-bold">{streak.current}</span> days
        </div>
        <div>
          🏆 Longest streak:  <span className="text-white font-bold">{streak.longest}</span> days
        </div>
      </div>
    </div>
  );
};

export default SubmissionHeatmap;
