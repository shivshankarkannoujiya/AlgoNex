import CreatePostForm from "../discussion/CreatePostForm";

const ProblemDiscussion = ({ problemId }) => {
  return (
    <div className="text-center text-gray-400 text-sm py-6">
      <CreatePostForm problemId={problemId} />
    </div>
  );
};

export default ProblemDiscussion;
