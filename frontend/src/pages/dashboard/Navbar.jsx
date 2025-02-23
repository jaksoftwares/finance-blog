import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-64 flex justify-between items-center p-4">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <div className="flex items-center space-x-3">
        <FaUserCircle className="text-2xl text-gray-700" />
        <span className="text-gray-700">Admin</span>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Logout</button>
      </div>
    </nav>
  );
}
