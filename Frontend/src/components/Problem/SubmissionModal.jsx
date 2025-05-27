import { CheckCircle2, Calendar, XCircle, User } from "lucide-react";
import React, { useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SubmissionDetailModal = ({ submission, onClose }) => {

  const modalContentRef = useRef(null);
  const runtimeData = JSON.parse(submission.time).map((value, i) => ({
    name: i + 1,
    value: parseFloat(value.split(" ")[0]),
  }));

  const memoryData = JSON.parse(submission.memory).map((value, i) => ({
    name: i + 1,
    value: parseFloat(value.split(" ")[0]),
  }));

  const handleBackdropClick = (e) => {
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(e.target)
    ) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-[#0B1225] text-white p-6 rounded-lg w-[90%] max-w-3xl shadow-xl relative"
        ref={modalContentRef}
      >
        <button className="absolute top-4 right-4 text-white" onClick={onClose}>
          <XCircle className="h-6 w-6" />
        </button>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {submission.status === "ACCEPTED" ? (
              <CheckCircle2 className="text-green-400" />
            ) : (
              <XCircle className="text-red-400" />
            )}
            <span className="text-lg font-semibold">{submission.status}</span>
          </div>
        </div>

        <div className="text-sm text-gray-300 flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{submission.user?.username} submitted at: </span>
          </div>
          <div className="flex items-center gap-2">
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

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold mb-2">Runtime</h3>
            <ResponsiveContainer width="70%" height={180}>
              <BarChart data={runtimeData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#00C9A7" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">Memory</h3>
            <ResponsiveContainer width="70%" height={180}>
              <BarChart data={memoryData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4169E1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetailModal;
