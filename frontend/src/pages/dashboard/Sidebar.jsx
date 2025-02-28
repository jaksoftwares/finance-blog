import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaFileAlt, FaUsers, FaTags, FaChartBar, FaCog, FaBars, FaTimes } from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true); // Sidebar state

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Sidebar menu items
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Posts", path: "/dashboard/posts", icon: <FaFileAlt /> },
    { name: "Categories", path: "/dashboard/categories", icon: <FaTags /> },
    { name: "Users", path: "/dashboard/users", icon: <FaUsers /> },
    { name: "Analytics", path: "/dashboard/analytics", icon: <FaChartBar /> },
    { name: "Settings", path: "/dashboard/settings", icon: <FaCog /> },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={toggleSidebar} 
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-full"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white h-screen fixed top-0 left-0 z-40 transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 text-lg font-bold flex items-center justify-between">
          {isOpen && <span>Finance Blog Admin</span>}
        </div>

        {/* Navigation */}
        <nav>
          <ul>
            {menuItems.map((item) => (
              <li key={item.path} className={`p-3 ${location.pathname === item.path ? "bg-gray-700" : ""}`}>
                <Link 
                  to={item.path} 
                  className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded transition-all"
                >
                  {item.icon} <span className={`${isOpen ? "block" : "hidden"} md:block`}>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div 
          onClick={toggleSidebar} 
          className="fixed inset-0 bg-black opacity-50 md:hidden z-30"
        ></div>
      )}
    </>
  );
}
