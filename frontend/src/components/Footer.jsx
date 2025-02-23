import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold">Financeblog</h2>
          <p className="text-gray-400 mt-2">
            A professional blogging platform to share ideas, learn, and grow.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-400 hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-400 hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-400 hover:text-white transition">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-gray-400 hover:text-white transition">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f text-gray-400 hover:text-white text-2xl"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter text-gray-400 hover:text-white text-2xl"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in text-gray-400 hover:text-white text-2xl"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center border-t border-gray-700 py-4">
        <p className="text-gray-500">
          © {new Date().getFullYear()} Financeblog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
