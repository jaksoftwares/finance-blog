import { useState } from "react";
import PostList from "./posts/PostList";
import PostForm from "./posts/PostForm";
import PostDetails from "./posts/PostDetails";

export default function Posts() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Posts Management</h2>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-300 mb-6">
        <button
          onClick={() => setActiveTab("all")}
          className={`py-2 px-4 text-lg font-semibold ${
            activeTab === "all" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
          } focus:outline-none`}
        >
          All Posts
        </button>
        <button
          onClick={() => setActiveTab("create")}
          className={`py-2 px-4 text-lg font-semibold ${
            activeTab === "create" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
          } focus:outline-none`}
        >
          Create Post
        </button>
        <button
          onClick={() => setActiveTab("manage")}
          className={`py-2 px-4 text-lg font-semibold ${
            activeTab === "manage" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
          } focus:outline-none`}
        >
          Manage Posts
        </button>
      </div>

      {/* Content Display */}
      <div>
        {activeTab === "all" && <PostList />}
        {activeTab === "create" && <PostForm />}
        {activeTab === "manage" && <PostDetails />}
      </div>
    </div>
  );
}
