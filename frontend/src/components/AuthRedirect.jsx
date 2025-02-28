import { Navigate } from "react-router-dom";
import { useContext } from "react";
import PropTypes from "prop-types"; // ✅ Import PropTypes
import AuthContext from "../context/AuthContext";

export default function AuthRedirect({ Component }) {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/dashboard" replace />; // Redirect logged-in users to dashboard
  }

  return <Component />;
}

// ✅ Define Prop Types
AuthRedirect.propTypes = {
  Component: PropTypes.elementType.isRequired, // Ensures `Component` is a valid React component
};
