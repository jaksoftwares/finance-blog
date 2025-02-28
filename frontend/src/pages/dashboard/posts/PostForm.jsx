import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PostForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // Used to check if editing an existing post
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [post, setPost] = useState({
    title: "",
    content: "",
    image: null,
  });

  // Fetch post data when editing
  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:8000/api/posts/${id}/`)
        .then((res) => setPost(res.data))
        .catch(() => setError("Failed to fetch post data"));
    }
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setPost({ ...post, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("content", post.content);
    if (post.image) formData.append("image", post.image);

    try {
      const token = localStorage.getItem("access_token");
      const headers = { Authorization: `Bearer ${token}` };

      if (id) {
        await axios.put(`http://127.0.0.1:8000/api/posts/${id}/`, formData, { headers });
        setSuccessMessage("Post updated successfully!");
      } else {
        await axios.post("http://127.0.0.1:8000/api/posts/", formData, { headers });
        setSuccessMessage("Post created successfully!");
      }

      setTimeout(() => navigate("/dashboard/posts"), 2000);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to save post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">{id ? "Edit Post" : "Create Post"}</h2>

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
      {successMessage && <p className="text-green-600 text-sm mb-3">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Content</label>
          <textarea
            name="content"
            value={post.content}
            onChange={handleChange}
            required
            rows="6"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Image (Optional)</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {loading ? "Saving..." : id ? "Update Post" : "Create Post"}
        </button>
      </form>
    </div>
  );
}
