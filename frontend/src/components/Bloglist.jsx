import  { useEffect, useState } from "react";
import { fetchPosts } from "../api";

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };

    getPosts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Blog Posts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600 mt-2">{post.content.substring(0, 100)}...</p>
            <p className="text-sm text-gray-500 mt-2">
              Author: {post.author.username} | Category: {post.categories.map(c => c.name).join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
