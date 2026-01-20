import axios from "axios";

const api = axios.create({
  baseURL:
    "https://sign-in-up-with-authorization-email-otp-production.up.railway.app/",
  withCredentials: true,
});

// OPTIONAL: simple response error pass-through
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
