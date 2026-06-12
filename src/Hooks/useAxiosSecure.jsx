import { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { getAuth } from "firebase/auth";
import useAuth from "./useAuth";

// 1. Create instance outside the hook
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // INTERCEPTORS SHOULD RUN ALWAYS, conditions will handle inside if needed.

    // 🚀 Request Interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          let token = null;

          // 1st Priority: context user object
          if (user && typeof user.getIdToken === "function") {
            token = await user.getIdToken();
          } else {
            // Fallback: Firebase Auth directly
            const auth = getAuth();
            if (
              auth.currentUser &&
              typeof auth.currentUser.getIdToken === "function"
            ) {
              token = await auth.currentUser.getIdToken();
            }
          }

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.error("Error getting Firebase token:", error);
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // 📥 Response Interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;

        // Handle 401 or 403 globally when you want to re-enable auto logout
        if (status === 401 || status === 403) {
          console.warn("Unauthorized access - status:", status);
          // Future plan: await logOut(); navigate("/login");
        }

        return Promise.reject(error);
      },
    );

    // 🧹 Cleanup interceptors properly when user/loading changes
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, loading, logOut, navigate]); // Correct dependencies

  // Always return the instance safely
  return axiosInstance;
};

export default useAxiosSecure;
