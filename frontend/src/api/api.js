import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const api = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

// request interceptor to attach token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // wherever you store JWT
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

//: response interceptor to handle global errors
api.interceptors.response.use(
  (response) => response, // normal responses pass through
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized → remove token and redirect to login
      localStorage.removeItem("token");
      window.location.href = "/login"; // or use react-router navigate
    }
    return Promise.reject(error);
  }
);

export default api;