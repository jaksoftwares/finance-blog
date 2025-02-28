import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Fetch dashboard data
const fetchDashboardData = async () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
      throw new Error("No authentication token found. Please log in.");
  }

  try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/dashboard/stats/", {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });

      return data;
  } catch (error) {
      throw new Error(error.response?.data?.detail || "Failed to fetch dashboard data.");
  }
};

export default function DashboardHome() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setIsAuthenticated(false);
      navigate("/login");
    }
  }, [navigate]);

  // Fetch dashboard data
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: fetchDashboardData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    retry: 1,
    onError: () => setIsAuthenticated(false),
  });

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  if (!isAuthenticated) return null; // Prevent rendering if not authenticated

  if (isLoading) return <p className="text-center text-lg">Loading dashboard data...</p>;

  if (error) {
    console.error("Dashboard fetch error:", error);
    return (
      <div className="text-center">
        <p className="text-red-600">{error.message}</p>
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-screen-xl mx-auto mt-16">
      {/* Header Section */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800">Welcome to Your Dashboard</h1>
          <p className="text-lg text-gray-600 mt-2">Manage your blog, view analytics, and handle posts efficiently.</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
        >
          Log Out
        </button>
      </div>

      {/* Dashboard Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Posts */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
          <div className="text-5xl text-blue-600 font-bold">{data.postsCount}</div>
          <p className="text-lg text-gray-700 mt-2">Total Posts</p>
        </div>

        {/* Active Users */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
          <div className="text-5xl text-green-600 font-bold">{data.activeUsersCount}</div>
          <p className="text-lg text-gray-700 mt-2">Active Users</p>
        </div>

        {/* Categories */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
          <div className="text-5xl text-yellow-600 font-bold">{data.categoriesCount}</div>
          <p className="text-lg text-gray-700 mt-2">Categories</p>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="mt-12 flex flex-col md:flex-row items-center justify-between bg-gray-100 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-start mb-6 md:mb-0">
          <h2 className="text-3xl font-semibold text-gray-800">Start Managing Your Blog</h2>
          <p className="text-lg text-gray-600 mt-2">Create posts, categorize them, and track analytics.</p>
        </div>
        <div>
          <Link
            to="/dashboard/posts"
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
