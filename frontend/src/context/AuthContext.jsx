import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types"; // ✅ Import PropTypes
import axios from "axios";

// Create the Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Function to log in a user
  const login = async (formData) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/login/", formData);
      const { access, refresh } = response.data;

      // Store token & user data
      localStorage.setItem("token", access);
      localStorage.setItem("refresh", refresh);
      setToken(access);

      // Set user state (Modify this if your API returns user details)
      setUser({ username: formData.username });

      return { success: true };
    } catch (error) {
      console.error("Login failed:", error.response?.data);
      return { success: false, message: error.response?.data?.detail || "Invalid credentials" };
    }
  };

  // Function to log out a user
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    setToken(null);
    setUser(null);
  };

  // Check token validity on page load
  useEffect(() => {
    if (token) {
      setUser({ username: "Authenticated User" }); // Optional: Fetch user details from API
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Define Prop Types for `AuthProvider`
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // `children` must be a React node and is required
};

export default AuthContext;
