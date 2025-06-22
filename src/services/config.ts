import axios from "axios";
import type { AxiosInstance } from "axios";

const API_TIMEOUT = 10000;

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
