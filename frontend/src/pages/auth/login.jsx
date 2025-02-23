import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext"; // ✅ Import AuthContext

export default function Login() {
  console.log("Login page loaded! ✅");

  const authContext = useContext(AuthContext);
  console.log("AuthContext:", authContext); // Debugging

  const [formData, setFormData] = useState({ username: "", password: "" });

  if (!authContext) {
    return <p className="text-center text-red-500">Error: AuthContext is not available</p>;
  }

  const { login } = authContext;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username: formData.username });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Welcome Back</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
// import { useContext } from "react";
// // import { AuthContext } from "../../context/AuthProvider"; 
// import AuthContext from "../../context/AuthContext";

// export default function Login() {
//   console.log("Login page loaded! ✅");

//   const authContext = useContext(AuthContext);
//   console.log("AuthContext:", authContext); // ✅ Check if it's still null

//   if (!authContext) {
//     return <p>Error: AuthContext is not available</p>; // Debugging
//   }

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-200">
//       <h2 className="text-3xl font-bold text-black">Login Page</h2>
//     </div>
//   );
// }