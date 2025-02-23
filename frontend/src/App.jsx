import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostDetail from "./pages/post/postdetail";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import Dashboard from "./pages/Dashboard";
// import CreatePost from "./pages/CreatePost";
import Blogs from "./pages/blog/blogs";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/login";
import Register from "./pages/auth/Register";
import Footer from "./components/Footer";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Posts from "./pages/dashboard/Posts";
import Categories from "./pages/dashboard/Categories";
import Users from "./pages/dashboard/Users";
import Analytics from "./pages/dashboard/Analytics";
import Settings from "./pages/dashboard/Settings";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/dposts" element={<Posts />} />
        <Route path="/dhome" element={<DashboardHome />} />
        <Route path="/dcategories" element={<Categories/>} />
        <Route path="/dusers" element={<Users />} />
        <Route path="/danalytics" element={<Analytics />} />
        <Route path="/dsettings" element={<Settings />} />
        {/* <Route path="/create" element={<CreatePost />} /> */}
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
