import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";

const fetchPost = async (id) => {
  const { data } = await axios.get(`http://127.0.0.1:8000/api/posts/${id}/`);
  return data;
};

export default function PostDetail() {
  const { id } = useParams(); // Get the post ID from the URL
  const { data: post, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
  });

  if (isLoading) return <p className="text-center mt-20 text-gray-600">Loading post...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">Error loading post.</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 mt-16">
      <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
      <p className="text-gray-600 mt-4">{post.content}</p>

      <Link to="/" className="mt-6 inline-block text-blue-500 hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
}
