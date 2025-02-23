import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const fetchPosts = async () => {
  const { data } = await axios.get("http://127.0.0.1:8000/api/posts/");
  return data;
};

export default function HomePage() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isLoading) return <p className="text-center mt-10">Loading posts...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error loading posts.</p>;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white h-[400px] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to Finance Insights</h1>
        <p className="text-lg max-w-2xl">
          Stay ahead in the financial world with expert articles, market trends, and valuable insights.
        </p>
        <Link
          to="/blog"
          className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-600 transition"
        >
          Explore Articles
        </Link>
      </div>

      {/* Latest Blog Posts */}
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Latest Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                <p className="text-gray-600 mt-2">{post.content.substring(0, 120)}...</p>
                <Link
                  to={`/post/${post.id}`}
                  className="text-blue-500 mt-4 inline-block hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-blue-600 text-white py-10 text-center mt-16">
        <h3 className="text-2xl font-semibold">Subscribe to Our Newsletter</h3>
        <p className="text-lg mt-2">Get the latest updates and insights delivered to your inbox.</p>
        <div className="mt-4 flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 w-80 rounded-l-md focus:outline-none text-gray-900"
          />
          <button className="bg-black px-6 py-3 rounded-r-md hover:bg-gray-800 transition">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
