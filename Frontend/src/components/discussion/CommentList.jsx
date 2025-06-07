import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import apiClient from "../../Service/apiClient";

function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");

  const fetchPostById = async (postId) => {
    try {
      const res = await apiClient.fetchPostById(postId);
      setComments(res.data.comments || []);
    } catch (err) {
      console.error("Error fetching post:", err);
      setError("Failed to load comments.");
    }
  };

  useEffect(() => {
    if (postId) {
      fetchPostById(postId);
    }
  }, [postId]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="mt-4 space-y-2">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}
    </div>
  );
}

export default CommentList;
