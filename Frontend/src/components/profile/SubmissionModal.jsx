import { formatDistanceToNow } from "date-fns";

const SubmissionModal = ({ isOpen, onClose, submission }) => {
  if (!isOpen || !submission) return null;

  const { problem, status, sourceCode, time, memory, updatedAt, language } =
    submission;

  const timeArray =
    typeof time === "string" ? JSON.parse(time.replace(/'/g, '"')) : time;
  const memoryArray =
    typeof memory === "string" ? JSON.parse(memory.replace(/'/g, '"')) : memory;

  const totalTime = timeArray.reduce(
    (sum, t) => sum + parseFloat(t.replace("s", "")),
    0,
  );
  const totalMemory = memoryArray.reduce(
    (sum, m) => sum + parseInt(m.replace("KB", "")),
    0,
  );

  function capitalizeEveryWord(str) {
    if (!str) {
      return "";
    }
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div className="fixed inset-0 bg-[#000814] home-gradientbg flex items-center justify-center z-50">
      <div className="bg-[#0A1128] text-white p-6 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto relative border border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl text-teal-500 font-bold mb-4">
          {problem?.title}
        </h2>

        <div className="flex items-center justify-between">
          <div>
            <p>
              <strong>Time:</strong> {totalTime.toFixed(2)} s
            </p>
            <p>
              <strong>Memory:</strong> {totalMemory} KB
            </p>
          </div>

          <div>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={
                  status === "ACCEPTED" ? "text-green-500" : "text-red-400"
                }
              >
                {status}
              </span>
            </p>

            <p>
              <strong>Submitted:</strong>{" "}
              {formatDistanceToNow(new Date(updatedAt))} ago
            </p>
            <p>
              <strong>Language:</strong> {capitalizeEveryWord(language)}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mt-4 mb-2">Submitted Code:</h3>
          <pre className="bg-[#001F3F] p-4 rounded-md overflow-auto text-sm whitespace-pre-wrap">
            <code>{sourceCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SubmissionModal;
