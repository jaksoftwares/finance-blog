import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPost = async (id) => {
  const { data } = await axios.get(`http://127.0.0.1:8000/api/posts/${id}/`);
  return data;
};

export default function PostDetail() {
  const { id } = useParams();
  const { data: post, isLoading, error } = useQuery(["post", id], () =>
    fetchPost(id)
  );

  if (isLoading) return <p>Loading post...</p>;
  if (error) return <p>Post not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-500">By {post.author.username}</p>
      <p className="mt-4">{post.content}</p>
    </div>
  );
}
