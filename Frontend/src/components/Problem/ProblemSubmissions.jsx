import { SubmissionList } from "../index";

const ProblemSubmissions = ({ submissionForProblem, isSubmissionLoading }) => {
  return (
    <div className="p-4 text-gray-200">
      <SubmissionList
        submissionForProblem={submissionForProblem}
        isSubmissionLoading={isSubmissionLoading}
      />
    </div>
  );
};

export default ProblemSubmissions;
