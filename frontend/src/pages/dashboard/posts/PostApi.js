import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/posts/";
const token = localStorage.getItem("access_token");

const authHeaders = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
};

// Fetch all posts
export const fetchPosts = async () => {
  try {
    const response = await axios.get(API_URL, authHeaders);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to fetch posts.");
  }
};

// Fetch a single post by ID
export const fetchPostById = async (postId) => {
  try {
    const response = await axios.get(`${API_URL}${postId}/`, authHeaders);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to fetch post.");
  }
};

// Create a new post
export const createPost = async (postData) => {
  try {
    const response = await axios.post(API_URL, postData, authHeaders);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to create post.");
  }
};

// Update an existing post
export const updatePost = async (postId, postData) => {
  try {
    const response = await axios.put(`${API_URL}${postId}/`, postData, authHeaders);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to update post.");
  }
};

// Delete a post
export const deletePost = async (postId) => {
  try {
    await axios.delete(`${API_URL}${postId}/`, authHeaders);
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to delete post.");
  }
};
