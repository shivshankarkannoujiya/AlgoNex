import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubmissions } from "../features/submission/submissionThunks";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";


const statusColor = {
  ACCEPTED: "text-green-600 font-semibold",
  "Compile Error": "text-red-600 font-semibold",
  "Time Limit Exceeded": "text-red-600 font-semibold",
  WRONG: "text-red-600 font-semibold",
};

const Submission = () => {
  const dispatch = useDispatch();
  const { submissions, isLoading } = useSelector((state) => state.submission);

  const safeParse = (data) => {
    try {
      if (typeof data === "string") {
        return JSON.parse(data);
      }
      return data;
    } catch (error) {
      console.error("Error while parsing data:", error);
      return [];
    }
  };

  const calculateAverage = (data) => {
    const array = safeParse(data).map((d) => parseFloat(d.split(" ")[0]));
    if (!array.length) return 0;
    return array.reduce((a, b) => a + b, 0) / array.length;
  };

  useEffect(() => {
    dispatch(getAllSubmissions());
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen bg-[#000814] text-white">
        <Loader className="size-10 animate-spin" />
      </div>
    );


  return (
    <div className="bg-[#000814] home-gradient text-gray-100 min-h-screen">
      <div className="p-6  overflow-x-auto  home-gradient max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-teal-600 ">All My Submissions</h2>
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className=" text-gray-300 uppercase">
            <tr>
              <th className="px-4 py-2 border">Time Submitted</th>
              <th className="px-4 py-2 border">Question</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Runtime</th>
              <th className="px-4 py-2 border">Language</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, idx) => {
              const avgRuntime = calculateAverage(submission.time);
              return (
                <tr key={idx} className="hover:bg-gray-800">
                  <td className="px-4 py-2 border">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-100">
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: false,
                        }).format(new Date(submission.createdAt))}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-2 border text-teal-600  cursor-pointer">
                    {submission?.problem ? (
                      <Link
                        to={`/problem/${submission.problem.problemId}`}
                        className="hover:underline hover:text-teal-400 transition duration-200"
                      >
                        {submission?.problem?.title}
                      </Link>
                    ) : (
                      "N/A Question"
                    )}
                  </td>

                  <td
                    className={`px-4 py-2 border ${statusColor[submission.status] || "text-gray-700"}`}
                  >
                    {submission.status}
                  </td>
                  <td className="px-4 py-2 border">
                    {avgRuntime.toFixed(3)} s
                  </td>
                  <td className="px-4 py-2 border">{submission.language}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Submission;
