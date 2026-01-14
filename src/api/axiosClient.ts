// src/api/axiosClient.ts
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8081/api",
  headers: { "Content-Type": "application/json" },
});

// ⭐ Load token từ localStorage MỖI LẦN gửi request
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Không có token → xoá header để tránh lỗi backend
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ⭐ Xử lý response
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Nếu token hết hạn, sai, hoặc F5 mất user → logout luôn cho sạch
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("email");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
