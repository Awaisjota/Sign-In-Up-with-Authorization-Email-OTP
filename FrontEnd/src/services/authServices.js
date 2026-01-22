import api from "../api/Api";

export const registerServices = (data) => api.post("/auth/register", data);

export const loginServices = (data) => api.post("/auth/login", data);

export const forgotServices = (data) => api.post("/auth/forgot-password", data);

export const resetServices = (data) => api.post("/auth/reset-password", data);
