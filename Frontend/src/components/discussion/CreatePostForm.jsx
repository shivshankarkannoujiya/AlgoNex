import { useForm } from "react-hook-form";
import apiClient from "../../Service/apiClient";

function CreatePostForm({ problemId }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

    console.log("PROBLEMID: ", problemId) 
  const onSubmit = async (data) => {
    if (!problemId) return;

    await apiClient.createPost({
      ...data,
      problemId,
    });

    reset();
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        className="w-full p-2 bg-gray-800 text-white rounded"
        placeholder="Title"
        {...register("title", { required: "Title is required" })}
      />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}

      <textarea
        className="w-full p-2 bg-gray-800 text-white rounded"
        placeholder="Write your post..."
        rows={4}
        {...register("content", { required: "Content is required" })}
      />
      {errors.content && (
        <p className="text-red-500 text-sm">{errors.content.message}</p>
      )}

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white rounded"
      >
        Post
      </button>
    </form>
  );
}

export default CreatePostForm;
