import { useState } from "react";
import CommentList from "./CommentList";
import apiClient from "../../Service/apiClient";

export default function PostItem({ post }) {
  const [upvotes, setUpvotes] = useState(post.upvotes || 0);
  const [comment, setComment] = useState("");

  const handleUpvote = async () => {
    const res = await apiClient.togglePostUpvote(post.id);
    setUpvotes(res.data.upvotes);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    await apiClient.addComment(post.id, comment);
    setComment("");
  };

  return (
    <div className="border p-4 rounded-xl bg-gray-900 text-white">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{post.title}</h2>
        <button onClick={handleUpvote} className="text-sm text-blue-400">
          👍 {upvotes}
        </button>
      </div>
      <p className="text-gray-300 mt-2">{post.content}</p>

      <form onSubmit={handleCommentSubmit} className="mt-4">
        <input
          type="text"
          className="p-2 w-full rounded bg-gray-800 text-white"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </form>

      <CommentList postId={post.id} />
    </div>
  );
}
