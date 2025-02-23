import { Link, useLocation } from "react-router-dom";
import { FaHome, FaFileAlt, FaUsers, FaTags, FaChartBar, FaCog } from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

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
    <aside className="w-64 bg-gray-900 text-white h-screen fixed top-0 left-0">
      <div className="p-4 text-lg font-bold">Finance Blog Admin</div>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className={`p-3 ${location.pathname === item.path ? "bg-gray-700" : ""}`}>
              <Link to={item.path} className="flex items-center space-x-2 hover:bg-gray-700 p-3 rounded">
                {item.icon} <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
