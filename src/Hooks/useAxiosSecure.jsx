import axios from "axios";
import { getAuth } from "firebase/auth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// ✅ Interceptor একবারই register করো — hook এর বাইরে
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (currentUser && typeof currentUser.getIdToken === "function") {
        const token = await currentUser.getIdToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.error("Error getting Firebase token:", error);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      console.warn("Unauthorized - status:", status);
    }
    return Promise.reject(error);
  },
);

const useAxiosSecure = () => {
  return axiosInstance;
};

export default useAxiosSecure;
