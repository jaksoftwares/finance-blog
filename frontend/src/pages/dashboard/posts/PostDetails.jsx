import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPostById, deletePost } from "./PostApi";
import { useParams, useNavigate } from "react-router-dom";
import { FaTrash, FaArrowLeft } from "react-icons/fa";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch post details
  const { data: post, isLoading, error } = useQuery({
    queryKey: ["postDetails", id],
    queryFn: () => fetchPostById(id),
    staleTime: 1000 * 60 * 5,
  });

  // Delete post mutation
  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      navigate("/dashboard/posts");
    },
  });

  // Handle delete post
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard/posts")}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
      >
        <FaArrowLeft className="mr-2" />
        Back to Posts
      </button>

      {/* Loading & Error States */}
      {isLoading && <p className="text-center text-lg">Loading post details...</p>}
      {error && <p className="text-center text-red-600">{error.message}</p>}

      {/* Post Details */}
      {post && (
        <>
          <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
          <p className="text-gray-600 mt-2">By {post.author} | Category: {post.category}</p>
          <hr className="my-4" />
          <div className="text-gray-700 leading-relaxed">{post.content}</div>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="mt-6 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center"
            disabled={deleteMutation.isLoading}
          >
            <FaTrash className="mr-2" />
            Delete Post
          </button>
        </>
      )}
    </div>
  );
}
