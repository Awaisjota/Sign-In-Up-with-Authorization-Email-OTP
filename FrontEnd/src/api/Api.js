import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// OPTIONAL: simple response error pass-through
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
