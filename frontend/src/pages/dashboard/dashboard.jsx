import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import DashboardHome from "./DashboardHome";
import Posts from "./Posts";
import Categories from "./Categories";
import Users from "./Users";
import Analytics from "./Analytics";
import Settings from "./Settings";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main Content */}
      <div className={`flex-1 transition-all ${isSidebarOpen ? "ml-64" : "ml-16"}`}>
        {/* Navbar */}
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Content Area */}
        <main className="p-6 mt-16">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/users" element={<Users />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
