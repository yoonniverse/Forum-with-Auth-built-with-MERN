import axios from "axios";

const API_URL = "/api/posts/";

const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, postData, config);
  return response.data;
};

const readPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const readPost = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

const deletePost = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + id, config);
  return response.data;
};

const updatePost = async (post, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(API_URL + post._id, post, config);
  return response.data;
};

const postsService = {
  createPost,
  readPosts,
  readPost,
  deletePost,
  updatePost,
};

export default postsService;
