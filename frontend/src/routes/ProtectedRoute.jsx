import { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types"; // ✅ Import PropTypes
import AuthContext from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// ✅ Define Prop Types
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Ensures `children` is a valid React node and required
};
