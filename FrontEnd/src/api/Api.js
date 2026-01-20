import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://sign-in-up-with-authorization-email-otp-production.up.railway.app/api"
      : "http://localhost:5000/api", // only if you run locally
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
