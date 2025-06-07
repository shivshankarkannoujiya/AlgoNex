import { useState } from "react";
import apiClient from "../../Service/apiClient";

export default function CommentItem({ comment }) {
  const [upvotes, setUpvotes] = useState(comment._count?.upvotes || 0);

  const handleUpvote = async () => {
    const res = await apiClient.toggleCommentUpvote(comment.id);
    setUpvotes(res.data.upvotes);
  };

  return (
    <div className="bg-gray-800 p-3 rounded">
      <div className="flex justify-between">
        <span className="text-white">{comment.content}</span>
        <button onClick={handleUpvote} className="text-sm text-blue-300">
          👍 {upvotes}
        </button>
      </div>
    </div>
  );
}
