import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const fetchPosts = async () => {
  const { data } = await axios.get("http://127.0.0.1:8000/api/posts/");
  return data;
};

export default function Blogs() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isLoading) return <p className="text-center mt-20 text-gray-600">Loading posts...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">Error loading posts.</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <header className="relative w-full h-[400px] bg-cover bg-center flex items-center justify-center text-center text-white"
        style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?finance,stock')" }}>
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-4xl font-extrabold">Welcome to Finance Insights</h1>
          <p className="mt-2 text-lg">Expert financial advice, investment tips, and market insights.</p>
        </div>
      </header>

      {/* Featured Section */}
      <section className="max-w-6xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Featured Articles</h2>
        {posts.length > 0 && (
          <div className="flex flex-col md:flex-row gap-6">
            {posts.slice(0, 3).map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden w-full md:w-1/3">
                <img
                  src={`https://source.unsplash.com/400x250/?money,${post.id}`} 
                  alt="Blog Cover"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">{post.content.substring(0, 120)}...</p>
                  <Link to={`/post/${post.id}`} className="mt-3 inline-block text-blue-500 hover:underline">
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-6xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Latest Blog Posts</h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={`https://source.unsplash.com/400x250/?finance,investment,${post.id}`}
                alt="Blog Cover"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{post.content.substring(0, 100)}...</p>
                <Link to={`/post/${post.id}`} className="mt-3 inline-block text-blue-500 hover:underline">
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <div className="text-center py-10 bg-blue-600 text-white mt-10">
        <h2 className="text-2xl font-semibold">Stay Updated with Finance Insights</h2>
        <p className="mt-2 text-lg">Subscribe to get the latest finance news and investment tips directly in your inbox.</p>
        <input
          type="email"
          placeholder="Enter your email"
          className="mt-4 p-2 w-80 rounded text-gray-900"
        />
        <button className="ml-2 bg-white text-blue-600 font-bold py-2 px-4 rounded hover:bg-gray-200 transition">
          Subscribe
        </button>
      </div>
    </div>
  );
}
