import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPosts, deletePost } from "./PostApi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

export default function PostList() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch posts
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  // Delete post mutation
  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]); // Refresh posts after deletion
    },
  });

  // Handle post deletion
  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteMutation.mutate(postId);
    }
  };

  // Handle search functionality
  const filteredPosts = posts?.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Posts</h1>
        <Link
          to="/dashboard/posts/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + New Post
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search posts..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Loading & Error States */}
      {isLoading && <p className="text-center text-lg">Loading posts...</p>}
      {error && <p className="text-center text-red-600">{error.message}</p>}

      {/* Post Table */}
      {filteredPosts && filteredPosts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Author</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
  {filteredPosts.map((post) => (
    <tr key={post.id} className="border-b">
      <td className="py-3 px-6">{post.title}</td>

      {/* Fixing Author Field */}
      <td className="py-3 px-6 flex items-center space-x-2">
        {post.author?.profile_picture && (
          <img
            src={post.author.profile_picture}
            alt="Author"
            className="w-8 h-8 rounded-full"
          />
        )}
        <span>{post.author?.username || "Unknown Author"}</span>
      </td>

      <td className="py-3 px-6">{post.category}</td>
      <td className="py-3 px-6 flex space-x-3">
        <Link to={`/dashboard/posts/${post.id}`} className="text-blue-600 hover:text-blue-800">
          <FaEye />
        </Link>
        <Link to={`/dashboard/posts/edit/${post.id}`} className="text-yellow-600 hover:text-yellow-800">
          <FaEdit />
        </Link>
        <button
          onClick={() => handleDelete(post.id)}
          className="text-red-600 hover:text-red-800"
          disabled={deleteMutation.isLoading}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No posts found.</p>
      )}
    </div>
  );
}
