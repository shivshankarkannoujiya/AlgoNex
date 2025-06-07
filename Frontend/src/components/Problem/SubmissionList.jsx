import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick as Memory,
  Calendar,
} from "lucide-react";
import SubmissionModal from "./SubmissionModal";

const SubmissionList = ({ submissionForProblem, isSubmissionLoading }) => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const safeParse = (data) => {
    try {
      return JSON.parse(data);
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

  if (isSubmissionLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <h2 className="text-white font-medium">Loading...</h2>
      </div>
    );
  }

  if (!submissionForProblem?.length) {
    return (
      <div className="text-center p-8">
        <div className="text-gray-200 font-semibold">NO SUBMISSION YET</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4 max-h-[850px] overflow-y-auto pr-4 -mr-4">
        {submissionForProblem.map((submission) => {
          const avgMemory = calculateAverage(submission.memory);
          const avgTime = calculateAverage(submission.time);

          return (
            <div
              key={submission.id}
              onClick={() => setSelectedSubmission(submission)}
              className="p-6 bg-[#0A1128] cursor-pointer hover:shadow-xl transition-shadow rounded-lg"
            >
              <div className="flex items-center justify-between gap-4">
               
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    {submission.status === "ACCEPTED" ? (
                      <div className="flex items-center gap-2 text-teal-500">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-semibold">
                          {submission.status}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-red-500">
                        <XCircle className="w-5 h-5" />
                        <span className="font-semibold">
                          {submission.status}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }).format(new Date(submission.createdAt))}
                    </span>
                  </div>
                </div>

                
                <div className="flex-1 flex justify-center">
                  <div className="inline-flex items-center justify-center px-3 py-1 text-xs font-medium rounded-full border border-gray-500 text-gray-100">
                    {submission.language}
                  </div>
                </div>

                
                <div className="flex items-center gap-4 text-gray-200 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{avgTime.toFixed(3)} s</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Memory className="w-4 h-4" />
                    <span>{avgMemory.toFixed(3)} KB</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedSubmission && (
        <SubmissionModal
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
        />
      )}
    </>
  );
};

export default SubmissionList;
