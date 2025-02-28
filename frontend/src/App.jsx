import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostDetail from "./pages/post/postdetail";
import Blogs from "./pages/blog/blogs";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/auth/login";
import Register from "./pages/auth/Register";
import PrivateRoute from "./components/PrivateRoute"; // ✅ Import Protected Route
import AuthRedirect from "./components/AuthRedirect"; // ✅ Import AuthRedirect

// Dashboard Components
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Posts from "./pages/dashboard/Posts";
import Categories from "./pages/dashboard/Categories";
import Users from "./pages/dashboard/Users";
import Analytics from "./pages/dashboard/Analytics";
import Settings from "./pages/dashboard/Settings";

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard"); // Check if user is in Dashboard

  return (
    <>
      {/* Only show Navbar & Footer if NOT on Dashboard */}
      {!isDashboard && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/blog" element={<Blogs />} />

        {/* Redirect Logged-In Users from Login/Register */}
        <Route path="/login" element={<AuthRedirect Component={Login} />} />
        <Route path="/register" element={<AuthRedirect Component={Register} />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="posts" element={<Posts />} />
            <Route path="categories" element={<Categories />} />
            <Route path="users" element={<Users />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Catch-All Route for 404 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {!isDashboard && <Footer />} {/* Hide Footer on Dashboard */}
    </>
  );
}

export default App;
