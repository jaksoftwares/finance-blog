import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const authContext = useContext(AuthContext);
  
  // ✅ Prevent errors if authContext is null
  const user = authContext?.user;
  const logout = authContext?.logout || (() => {});

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white text-gray-900 shadow-md fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Finance blog
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Nav Links (Desktop) */}
        <div className="hidden md:flex space-x-6 text-lg">
          <Link to="/" className="hover:text-blue-500 transition">Home</Link>
          <Link to="/blog" className="hover:text-blue-500 transition">Blog</Link>
          <Link to="/about" className="hover:text-blue-500 transition">About</Link>
          <Link to="/contact" className="hover:text-blue-500 transition">Contact</Link>
          {user && <Link to="/dashboard" className="hover:text-blue-500 transition">Dashboard</Link>}
        </div>

        {/* Auth Section */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <span className="hidden sm:inline">{user.username}</span>
              <FaUserCircle className="text-2xl text-gray-700" />
              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                Login
              </Link>
              <Link to="/register" className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 transition">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg py-3 absolute w-full left-0 top-16">
          <Link to="/" className="block text-center py-2 hover:text-blue-500 transition">Home</Link>
          <Link to="/blog" className="block text-center py-2 hover:text-blue-500 transition">Blog</Link>
          <Link to="/about" className="block text-center py-2 hover:text-blue-500 transition">About</Link>
          <Link to="/contact" className="block text-center py-2 hover:text-blue-500 transition">Contact</Link>
          {user && <Link to="/dashboard" className="block text-center py-2 hover:text-blue-500 transition">Dashboard</Link>}
          
          {/* Auth Links in Mobile Menu */}
          <div className="text-center py-2">
            {user ? (
              <>
                <span className="block text-gray-700">{user.username}</span>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700 transition">
                  Login
                </Link>
                <Link to="/register" className="block bg-gray-500 text-white px-4 py-2 mt-2 rounded hover:bg-gray-700 transition">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
